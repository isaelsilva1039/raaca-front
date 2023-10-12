export default interface Options {
    responsive: boolean,
    plugins: {
        legend: {
            display: boolean
        },
    },
    scales: {
        x: {
            grid: {
                display: boolean
            },
            ticks: {
                beginAtZero: boolean,
                color: string,
                font: {
                    size: number,
                    family: string,
                },
            }
        },
        y: {
            display: boolean,
            grid: {
                display: boolean,
            },
        }
    }
}