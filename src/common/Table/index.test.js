import { render, screen } from '@testing-library/react';
import { Table } from './';


describe('Table', () => {
	describe('Render', () => { 
		test('with no props', () => {
			render(<Table />);
		});
		
		test('with props', () => {
			const config = {
				title: 'Table Title',
				headers: [
					{
						label: 'Header 1',
						accessor: 'col0'
					},
					{
						label: 'Header 2',
						accessor: 'col1'
					},
				],
				rows: [
					{
						data: {
							col0: 'Data 0'
						}
					},
					{
						data: {
							col1: 'Data 1'
						}
					},
				]
			}
			render(<Table config={config} />);
		});
		test('with invalid props use case 1', () => {
			const config = {
				headers: 1,
				rows: 2
			}
			render(<Table config={config} />);
		});
		test('with invalid props use case 2', () => {
			const config = {
				rows: [
					{}
				]
			}
			render(<Table config={config} />);
		});
	})
})