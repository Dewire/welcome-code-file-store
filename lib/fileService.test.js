describe('fileService', () => {
  describe('constructor', () => {
    it('Should use bucket from config as default parameter.', () => {
      jest.doMock('./config', () => ({
        BUCKET: 'foo',
      }));
      const { FileService } = require('./fileService');
      expect(new FileService().bucket).toBe('foo');
    });
  });
  describe('create', () => {
    it('Should throw error when no parameters passed.', () => {
      const { FileService } = require('./fileService');
      expect(() => new FileService().createOrUpdate()).toThrowError('Missing required parameter filePath.');
    });
  });
});
