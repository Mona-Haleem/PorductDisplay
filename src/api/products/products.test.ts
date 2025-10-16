// import axios from 'axios';
// import { getProducts, deleteProduct } from './index';

// jest.mock('axios');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('API Layer', () => {
//   afterEach(() => jest.clearAllMocks());


//   it('getProducts: fetches product list', async () => {
//     mockedAxios.get.mockResolvedValue({ data: [{ id: 1, title: 'Product 1' }] });
//     const result = await getProducts();
//     expect(result).toEqual([{ id: 1, title: 'Product 1' }]);
//   });

//   it('deleteProduct: returns isDeleted true', async () => {
//     mockedAxios.delete.mockResolvedValue({ data: { isDeleted: true } });
//     const result = await deleteProduct(1);
//     expect(result.isDeleted).toBe(true);
//   });
// });
