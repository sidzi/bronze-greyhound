// TODO: Write end to test for
// - Creating todo multiple times
// - Reading all todos
// - Reading todos via id
const http = require('axios').default;

describe('End to End TODO Tests', ()=> {
	beforeAll(()=>{
		// TODO Clean Up the Table
		jest.setTimeout(20000);
	})

	it('Should create multiple todos', async (done)=> {
		let i = 2;
		while(i-- > 0){
			const response = await http.post('http://localhost:4566/2015-03-31/functions/create-todo-function/invocations', {
				'title': 'Hello World !',
				'task': `Do Good Integration Tests ! #${i}`
			})
			expect(response.status).toBe(200);
			expect(response.data.success).toBe(true);
			console.log(response.data);	
		}
		done();
	})

	it('Should read all todos', async (done)=>{
			const response = await http.post('http://localhost:4566/2015-03-31/functions/read-todo-function/invocations', {
				'task': 'all'
			})
			expect(response.status).toBe(200);			
			expect(response.data.success).toBe(true);
			console.log(response.data);	
			done();
	});

	it('Should read a specific todo', async (done)=>{
			const response = await http.post('http://localhost:4566/2015-03-31/functions/read-todo-function/invocations', {
				'task': 'f82ad48b-566b-4b0e-9776-d6b74b6fa990'
			})
			expect(response.status).toBe(200);
			console.log(response.data);	
			expect(response.data.success).toBe(true);
			expect(response.data.data.Item.title.S).toBe("Hello World !");
			done();
	});
})