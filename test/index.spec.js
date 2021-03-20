// TODO: Write end to test for
// - Creating todo multiple times
// - Reading all todos
// - Reading todos via id
const http = require('axios').default;

describe('End to End TODO Tests', ()=> {
	beforeAll(()=>{
		jest.setTimeout(10000);
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

	// it('Should read all todos', async (done)=>{
	// 		const response = await http.post('http://localhost:4566/2015-03-31/functions/read-todo-function/invocations', {
	// 			'task': 'all'
	// 		})
	// 		console.log(response.status);
	// 		expect(response.status).toBe(200);
	// 		const dataString = JSON.stringify(response.data);
	// 		console.log(dataString);
	// 		const data = JSON.parse(dataString);

	// 		expect(data.success).toBe(true);
	// });

	// it('Should read all todos', async (done)=>{
	// 		const response = await http.post('http://localhost:4566/2015-03-31/functions/read-todo-function/invocations', {
	// 			'task': '129fb230-c96e-44c4-a116-dcda60031a84'
	// 		})
	// 		console.log(response.status);
	// 		expect(response.status).toBe(200);
	// 		const dataString = JSON.stringify(response.data);
	// 		console.log(dataString);
	// 		const data = JSON.parse(dataString);
	// 		expect(data.success).toBe(true);
	// 		expect(data.data.title).toBe("Hello");
	// });
})