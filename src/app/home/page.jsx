'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useFilters, useGlobalFilter, usePagination, useTable } from 'react-table';
import { COLUMNS } from '../utils/columns';
import MOCK_DATA from '../utils/MOCK_DATA.json';
import FilterComponent from '../components/FilterComponent';

const DataTablePage = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);
    const router = useRouter()
    const [filterInput, setFilterInput] = useState('');

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        setFilter,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        previousPage,
        setPageSize,
        pageOptions,
        nextPage,
        setGlobalFilter,
        state: { pageIndex, pageSize },
    } = useTable(
        { columns, data, initialState: { pageIndex: 0, pageSize: 10 } },
        useFilters,
        useGlobalFilter,
        usePagination
    );

    const handleFilterChange = e => {
        const value = e.target.value || '';
        setGlobalFilter(value);
        setFilterInput(value);
    };
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            router.replace('/login');
        }
    }, [router]);
    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        router.push('/login')
    }
    console.log('page', page)

    return (
        <div className="p-6 bg-gray-50">
            <div className='flex justify-between mb-4'>
                <h2 className="text-2xl font-bold">User Details</h2>
                <button className=' bg-blue-500 text-white px-4 rounded-md' onClick={() => logout()}>Logout </button>
            </div>
            <FilterComponent handleFilterChange={handleFilterChange} filterInput={filterInput} />
            <div className="overflow-x-auto">
                <table {...getTableProps()} className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="py-3 px-6 text-left text-gray-600 font-semibold uppercase text-sm"
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.length > 0 ? (
                            page.map(row => {
                                prepareRow(row);
                                return (
                                    <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                        {row.cells.map(cell => (
                                            <td {...cell.getCellProps()} className="border-t border-gray-200 py-2 px-6">
                                                {cell.render('Cell')}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4 text-gray-600">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {page.length > 0 ? (
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-gray-600">
                            Page {' '}
                            <strong className="text-blue-600">
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>
                        </span>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                                className={`ml-2 px-3 py-1 border rounded-md ${canPreviousPage ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                            >
                                {'<<'}
                            </button>
                            <input
                                type="number"
                                // defaultValue={pageIndex + 1}
                                placeholder='page no.'
                                onChange={(e) => {
                                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                    if (pageNumber >= 0 && pageNumber < pageOptions.length) {
                                        gotoPage(pageNumber);
                                    } else if (pageNumber < 0) {
                                        gotoPage(0);
                                        e.target.value = 0;
                                    } else {
                                        e.target.value = pageOptions.length;
                                    }
                                }}
                                className="w-16 text-sm text-center border border-gray-300 rounded-md p-2"
                            />
                            <select
                                value={pageSize}
                                onChange={(e) => setPageSize(Number(e.target.value))}
                                className="border border-gray-300 rounded-md p-1"
                            >
                                {[10, 25, 50].map((size) => (
                                    <option key={size} value={size}>Show {size}</option>
                                ))}
                            </select>
                            <button
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                                className={`px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50`}
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                                className={`px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50`}
                            >
                                Next
                            </button>
                            <button
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                                className={`px-3 py-1 border rounded-md ${canNextPage ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                            >
                                {'>>'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                null
            )}

        </div>

    );
};

export default DataTablePage;
