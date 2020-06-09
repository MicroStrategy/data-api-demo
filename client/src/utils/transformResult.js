export const getTableData = (json) => {

//Gets the elements for a row name 
    const getElementsForRowName = (row, name, formIndex) => {
        return row.elements.map(element => {
            if(element.subtotal) {
                return element.formValues[0];
            } else {
                return element.formValues[formIndex];
            }
        })
    };

    
//Gets the elements for a column name excluding the Metric column
    const getElementsForColumnName = (column, name, formIndex) => column.elements.map(element => element.formValues[formIndex]);
 
//Gets the row's elements including the row's different formValues 
    const parseRows = () => {
        const rows = json.definition.grid.rows;
        const responseRowData = [];
        let rowIndex = 0;
        rows.forEach(row => {
            let curRowData = {};
            if (row.forms.length === 1) {
                const rowName = row.name;
                curRowData.name = rowName;
                curRowData.elements = getElementsForRowName(row, rowName, 0);
                curRowData.index = rowIndex
                responseRowData.push(curRowData)
            } else {
                row.forms.forEach((form, formIndex, rowIndex) => {
                    curRowData = {};
                    const rowName = `${row.name}@${form.name}`;
                    curRowData.name = rowName;
                    curRowData.elements = getElementsForRowName(row, row.name, formIndex);
                    curRowData.index = rowIndex;
                    responseRowData.push(curRowData)
                });
            }
            rowIndex++;
        });
        return responseRowData;
    }

    const parseColumns = () => {
        const columns = json.definition.grid.columns;
        const responseColumnData = []
        let columnIndex = 0;
        columns.forEach(column => {
            if(column.name !== "Metrics") {
                let curColumnData = {};
                if (column.forms.length === 1) {
                    const columnName = column.name;
                    curColumnData.name = columnName;
                    curColumnData.elements = getElementsForColumnName(column, columnName, 0);
                    curColumnData.index = columnIndex
                    responseColumnData.push(curColumnData)
                } else {
                    column.forms.forEach((form, formIndex, columnIndex) => {
                        curColumnData = {};
                        const columnName = `${column.name}@${form.name}`;
                        curColumnData.name = columnName;
                        curColumnData.elements = getElementsForColumnName(column, column.name, formIndex);
                        curColumnData.index = columnIndex
                        responseColumnData.push(curColumnData)
                    });
                }
                columnIndex++;
            }
        });
        return responseColumnData;
    }
    const parseMetrics = () => {
        let index = 0;
        let metricElements = {};
        json.definition.grid.columns.forEach(column => {
            if(column.name === "Metrics") {
                metricElements = {
                    name: column.name,
                    elements: column.elements.map(element => element.name),
                    index
                };
            }
            index++;
        })
        return metricElements;
    };

//Maps indices in indexMap to their respective values in rowElements
    const mapIndex = (rowElements, indexMap) => {
        return indexMap.map((row) => {
            return row.map((r, rowIndex) => {
                return rowElements[rowIndex].elements[r];
            })
        });
    };
    const transposeArray = array => array[0].map((col, i) => array.map(row => row[i]));
    const rowElements = parseRows();
    const columnElements = [...parseColumns(), parseMetrics()];
    const headerDataRows = mapIndex(rowElements, json.data.headers.rows)
    const headerDataColumns = mapIndex(columnElements, transposeArray(json.data.headers.columns))    
    const rowNames = json.data.headers.rows[0].map((value, valueIndex) => rowElements[valueIndex].name);
  
    const columnNames = [];
    columnElements.forEach(column => {
        if(column.elements) {
            columnNames.push(...column.elements)
        } else {
            columnNames.push(column.name)
        }
    })
    const rawData = json.data.metricValues.raw;
    const formattedwData = json.data.metricValues.formatted;
    const allHeaders = [...rowNames, ...columnNames];
    const allRows = headerDataRows.map((row, rowIndex) => {
        return [...row, ...formattedwData[rowIndex]]   // Append row and metric data
    });
    return [allHeaders, ...allRows];
}