process.argv.push('test')
const {count,filter} = require('../app');

describe('filter test', () => {
    it('should show the animals matching with the ry string pattern', () => {
        const result = count(filter('ry'));
        expect(result).toEqual([{"name":"Uzuzozne [1]","people":[{"name":"Lillie Abbott [1]","animals":[{"name":"John Dory"}]}]},{"name":"Satanwi [1]","people":[{"name":"Anthony Bruno [1]","animals":[{"name":"Oryx"}]}]}]);
    });
    it('should show that nothing has been found when no animals or people match the string pattern', () => {
        const result = count(filter('ryad'));
        expect(result).toEqual('Nothing found');
    });
});