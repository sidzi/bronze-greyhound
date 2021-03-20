const {createTODO} = require('../../create-todo/create-todo');

describe('Create TODO Tests', ()=>{
	it('Should create a single todo', async ()=> {
		const mockPutItemPromise = jest.fn(()=>{}); 
		const result = createTODO({
			putItem: ()=>{
				return {
					promise:() => new mockPutItemPromise()
				}
			}
		},{});
		
		expect(mockPutItemPromise).toHaveBeenCalledTimes(1);
	})
})