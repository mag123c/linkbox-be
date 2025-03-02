import ogs from 'open-graph-scraper';

describe('OGScraper', () => {
    let naverUrl = 'https://www.naver.com';
    let npmTestUrl = 'https://www.npmjs.com/package/open-graph-scraper';
    let googleUrl = 'https://www.google.com';
    let myBlogUrl = 'https://mag1c.tistory.com/';

    it('should get metadata from naver.com', async () => {
        const options = {
            url: naverUrl,
            timeout: 3000,
        };

        const response = await ogs(options);
        const result = response.result;

        expect(result.success).toBe(true);
    });

    it('should get metadata from npmjs.com', async () => {
        const options = {
            url: npmTestUrl,
            timeout: 3000,
        };

        const response = await ogs(options);
        const result = response.result;

        expect(result.success).toBe(true);
    });

    it('should get metadata from google.com', async () => {
        const options = {
            url: googleUrl,
            timeout: 3000,
        };

        const response = await ogs(options);
        const result = response.result;

        expect(result.success).toBe(true);
    });

    it('should get metadata from my blog', async () => {
        const options = {
            url: myBlogUrl,
            timeout: 3000,
        };

        const response = await ogs(options);
        const result = response.result;

        expect(result.success).toBe(true);
    });
});
