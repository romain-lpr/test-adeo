describe('filter test', () => {
    let originalArgv;
    beforeEach(() => {
        originalArgv = process.argv;
        jest.resetModules();
    });
    afterEach(() => {
        process.argv = originalArgv;
        console.log.mockClear();
    });
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });
    afterAll(() => {
        console.log.mockRestore();
    });
    it('should show that arguments are missing', () => {
        require('../app.js');
        expect(JSON.parse(console.log.mock.calls[0])).toEqual('Arguments missing')
    });
    it('should list the possible arguments when a wrong argument is given', () => {
        process.argv.push('error')
        require('../app.js');
        expect(JSON.parse(console.log.mock.calls[0])).toEqual('Wrong arguments, only accept argument : filter, --filter, count, --count.')
    });
    it('should show the animals matching with the ry string pattern', () => {
        process.argv[2] = 'filter=ry';
        require('../app');
        expect(JSON.parse(console.log.mock.calls[0])).toEqual([{"name":"Uzuzozne","people":[{"name":"Lillie Abbott","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi","people":[{"name":"Anthony Bruno","animals":[{"name":"Oryx"}]}]}]);
    });
    it('should show that nothing has been found when no animals or people match the string pattern', () => {
        process.argv[2] = 'filter=ryad';
        require('../app');
        expect(JSON.parse(console.log.mock.calls[0])).toEqual('Nothing found');
    });
});
