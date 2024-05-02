"use client"
import React, {useState, useEffect} from 'react'
import supabase from '@/supabase/config';

const page = () => {
    const  [data, setData] = useState([])
    const [cols, setCols] =useState([])
    const [hiddenColumns, setHiddenColumns] = useState([]);



    useEffect(() => {
const getData = async () => {
 
const { data: test, error } = await supabase.from("test").select("*");
if(error){
    console.log(error)
}
if(test){
    console.log(test)
    setData(test);
    setCols(Object.keys(test[0]))
    
}


          
};
    getData();

    }, [])
console.log(cols);

 const toggleColumn = (columnName) => {
   if (hiddenColumns.includes(columnName)) {
     setHiddenColumns(hiddenColumns.filter((col) => col !== columnName));
   } else {
     setHiddenColumns([...hiddenColumns, columnName]);
   }
 };
  const renderValueHeaders = () => {
    return Array.from({ length: data.length }, (_, index) => (
      <th key={index}>Per item price </th>
    ));
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>comparison_parameter</th>

            {data.map((data, index) => (
                <th key={index}>{data.comparison_parameter}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              onClick={() => toggleColumn("item")}
              style={{ cursor: "pointer" }}
            >
              item
            </th>

            {renderValueHeaders()}
          </tr>
          {!hiddenColumns.includes("item") && (
            <tr>
              <td>
                {cols.map((data, index) => (
                  <ul key={index}>
                    <li>{data}</li>
                  </ul>
                ))}
              </td>

              {data.map((data, index) => (
                <td key={index}>
                  <ul>
                    <li>{data.comparison_parameter}</li>
                    <li>{data.items}</li>
                    <li>{data.net_landed_value}</li>
                    <li>{data.total_landed_value}</li>
                  </ul>
                </td>
              ))}
            </tr>
          )}
          <tr>
            <td>
              <ul>
                <li>Total Landed Value</li>
                <li>Freight</li>
                <li>Total value</li>
                <li>Gst</li>
              </ul>
            </td>

            <td>
              <ul>
                <li>7200</li>
                <li>1000</li>
                <li>8198</li>
                <li>160</li>
              </ul>
            </td>
            <td>
              <ul>
                <li>7200</li>
                <li>1000</li>
                <li>8198</li>
                <li>160</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default page