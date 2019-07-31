const expect = require('chai').expect;

describe("sequence", () => {
    const items = [1,2,3];
    const t = [];
    const process = async item => new Promise((resolve, reject) => 
        t.push(setTimeout(() => {
            console.info(`inside ${item}`);
            resolve();
        }, 100))
    );

    it("works the wrong way", async done => {
        console.info("");
        const start = +(new Date);
        await items.map(async item => {
            console.info(`entering ${item}`);
            await process(item);
            console.info(`leaving ${item}`);
        });
        t.map(t => clearTimeout(t));
        console.info(`>> elapsed ${(+(new Date)-start)/1000} seconds`)
        done();
    })

    it("works the sequential way", async done => {
        console.info("");
        const start = +(new Date);
        for (let i = 0; i<items.length; i++) {
            const item = items[i];
            console.info(`entering ${item}`);
            await process(item);
            console.info(`leaving ${item}`);
        }
        t.map(t => clearTimeout(t));
        console.info(`>> elapsed ${(+(new Date)-start)/1000} seconds`)
        done();
    });

    it("works parallel way (screws logging, though)", async done => {
        console.info("");
        const start = +(new Date);
        const processes = items.map(async item => {
            console.info(`entering ${item}`);
            await process(item);
            console.info(`leaving ${item}`);
        });
        await Promise.all(processes);
        t.map(t => clearTimeout(t));
        console.info(`>> elapsed ${(+(new Date)-start)/1000} seconds`)
        done();    
    });
});
