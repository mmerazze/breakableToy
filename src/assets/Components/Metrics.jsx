import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export default function Metrics() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const columns = [
        { field: 'category', headerClassName: 'super-app-theme--header', headerName: 'Category', width: 200 },
        { field: 'totalStock', headerClassName: 'super-app-theme--header', headerName: 'Total Stock', width: 240 },
        { field: 'totalValue', headerClassName: 'super-app-theme--header', headerName: 'Total Value', width: 240 },
        { field: 'averagePrice', headerClassName: 'super-app-theme--header', headerName: 'Average Price', width: 240 }
    ];

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/products/getMetrics');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const formattedData = data.map(categoryMetric => ({
                id: categoryMetric.category,
                category: categoryMetric.category,
                totalStock: categoryMetric.totalStock,
                totalValue: categoryMetric.totalValue,
                averagePrice: categoryMetric.averagePrice,
            }));
            setRows(formattedData);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Paper sx={{
            height: 400,
            width: '100%',
            '& .super-app-theme--header': {
                backgroundColor: 'rgba(23, 95, 200, 0.76)',
            },
                }}>
            <DataGrid
                rows={rows}
                columns={columns}
                loading={loading}
                sx={{ border: 0 , '& .MuiDataGrid-columnHeaders': {color: 'white',},}}
            />
        </Paper>
    );
}