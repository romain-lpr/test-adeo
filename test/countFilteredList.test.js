const {count,filter} = require('../app');

describe('count filtered list test', () => {
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
    it('should show the animals matching with the ry string pattern with arguments', () => {
        process.argv[2] = 'filter=ry'
        process.argv[3] = 'count'
        require('../app');
        expect(JSON.parse(console.log.mock.calls[0])).toEqual([{"name":"Uzuzozne [1]","people":[{"name":"Lillie Abbott [1]","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi [1]","people":[{"name":"Anthony Bruno [1]","animals":[{"name":"Oryx"}]}]}]);
    });
    it('should show that nothing has been found when no animals or people match the string pattern with arguments', () => {
        process.argv[2] = 'filter=ryad'
        process.argv[3] = 'count'
        require('../app');
        expect(JSON.parse(console.log.mock.calls[0])).toEqual('Nothing found');
    });
    it('should show the animals matching with the ry string pattern without arguments', () => {
        process.argv[2] = ''
        process.argv[3] = ''
        const {count,filter} = require('../app');
        const result = count(filter('ry'))
        expect(result).toEqual([{"name":"Uzuzozne [1]","people":[{"name":"Lillie Abbott [1]","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi [1]","people":[{"name":"Anthony Bruno [1]","animals":[{"name":"Oryx"}]}]}]);
    });
    it('should show that nothing has been found when no animals or people match the string pattern without arguments', () => {
        process.argv[2] = ''
        process.argv[3] = ''
        const {count,filter} = require('../app');
        const result = count(filter('ryad'))
        expect(result).toEqual('Nothing found');
    });
});