const {readTODO} = require('../../read-todo/read-todo');

describe('Create TODO Tests', ()=>{
	it('Should read a todo', async ()=> {
		const mockGettemPromise = jest.fn(()=>{}); 
		const result = readTODO({
			getItem: ()=>{
				return {
					promise:() => new mockGettemPromise()
				}
			}
		},{
			task: '348290hjknsda'
		});
		
		expect(mockGettemPromise).toHaveBeenCalledTimes(1);
	})

	it('Should read all todos', async ()=> {
		const mocksScanPromise = jest.fn(()=>{}); 
		const result = readTODO({
			scan: ()=>{
				return {
					promise:() => new mocksScanPromise()
				}
			}
		},{
			task: 'all'
		});
		
		expect(mocksScanPromise).toHaveBeenCalledTimes(1);
	})
})