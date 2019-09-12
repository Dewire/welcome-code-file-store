import { normalize } from 'path';
import uuidv4 from 'uuid/v4';
import { ResponseBuilder } from '../lib/ResponseBuilder';
import fileService from '../lib/fileService';

const createOrUpdate = path => new Promise((resolve, reject) => {
  fileService.createOrUpdate(path)
    .then(data => resolve(new ResponseBuilder()
      .status(201)
      .json({ data })
      .build()))
    .catch((error) => {
      console.log(error);
      reject(new ResponseBuilder()
        .status(500)
        .json(error)
        .build());
    });
});

module.exports.file = (event, context, cb) => {
  console.log(event);
  const { httpMethod, pathParameters } = event;
  switch (httpMethod) {
    case 'POST':
    case 'PUT':
      createOrUpdate(normalize(`${decodeURIComponent(pathParameters.proxy)}/${uuidv4()}`)).then(res => cb(null, res));
      break;
    default:
      cb(null, new ResponseBuilder().status(501).text('Not implemented yet.').build());
      break;
  }
};
