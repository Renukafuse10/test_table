// "use client"
// import React, {useState, useEffect} from 'react'
// import supabase from '@/supabase/config';

// const page = () => {
//     const  [data, setData] = useState([])
//     const [cols, setCols] =useState([])
//     const [hiddenColumns, setHiddenColumns] = useState([]);

//     useEffect(() => {
// const getData = async () => {

// const { data: test, error } = await supabase.from("test").select("*");
// if(error){
//     console.log(error)
// }
// if(test){
//     console.log(test)
//     setData(test);
//     setCols(Object.keys(test[0]))

// }

// };
//     getData();

//     }, [])
// console.log(cols);

//  const toggleColumn = (columnName) => {
//    if (hiddenColumns.includes(columnName)) {
//      setHiddenColumns(hiddenColumns.filter((col) => col !== columnName));
//    } else {
//      setHiddenColumns([...hiddenColumns, columnName]);
//    }
//  };
//   const renderValueHeaders = () => {
//     return Array.from({ length: data.length }, (_, index) => (
//       <th key={index}>Per item price </th>
//     ));
//   };
//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>comparison_parameter</th>

//             {data.map((data, index) => (
//                 <th key={index}>{data.comparison_parameter}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <th
//               onClick={() => toggleColumn("item")}
//               style={{ cursor: "pointer" }}
//             >
//               item
//             </th>

//             {renderValueHeaders()}
//           </tr>
//           {!hiddenColumns.includes("item") && (
//             <tr>
//               <td>
//                 {cols.map((data, index) => (
//                   <ul key={index}>
//                     <li>{data}</li>
//                   </ul>
//                 ))}
//               </td>

//               {data.map((data, index) => (
//                 <td key={index}>
//                   <ul>
//                     <li>{data.comparison_parameter}</li>
//                     <li>{data.items}</li>
//                     <li>{data.net_landed_value}</li>
//                     <li>{data.total_landed_value}</li>
//                   </ul>
//                 </td>
//               ))}
//             </tr>
//           )}
//           <tr>
//             <td>
//               <ul>
//                 <li>Total Landed Value</li>
//                 <li>Freight</li>
//                 <li>Total value</li>
//                 <li>Gst</li>
//               </ul>
//             </td>

//             <td>
//               <ul>
//                 <li>7200</li>
//                 <li>1000</li>
//                 <li>8198</li>
//                 <li>160</li>
//               </ul>
//             </td>
//             <td>
//               <ul>
//                 <li>7200</li>
//                 <li>1000</li>
//                 <li>8198</li>
//                 <li>160</li>
//               </ul>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default page

"use client";
import React, { useState, useEffect } from "react";
import supabase from "@/supabase/config";

const Page = () => {
  const [data, setData] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [cols, setCols] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { data: quotes, error } = await supabase
        .from("quotes")
        .select("*")
        .eq("rfq_id", "2e84b2f7-1804-47c8-8b29-edd4f5d09f75");
      if (error) {
        console.log(error);
      }
      if (quotes) {
        console.log(quotes);
        setAlldata(quotes);

        setData(quotes[0].quote_items);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const quotedQuantitiesObject = createObjectWithQuotedQuantities(data);
    setCols(Object.keys(quotedQuantitiesObject));
    // console.log(quotedQuantitiesObject);
  }, [data]);

  function createObjectWithQuotedQuantities(data) {
    const obj = {};
    data.forEach((quote) => {
      obj[quote.item_name] = quote.item_name;
    });
    return obj;
  }

  const toggleColumn = (columnName) => {
    if (hiddenColumns.includes(columnName)) {
      setHiddenColumns(hiddenColumns.filter((col) => col !== columnName));
    } else {
      setHiddenColumns([...hiddenColumns, columnName]);
    }
  };

  const renderValueHeaders = () => {
    return alldata.map((dataItem, index) => (
      <th key={index}>Per item price </th>
    ));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>comparison_parameter</th>
            {alldata.map((dataItem, index) => (
              // <th key={index}>{dataItem.vendor_name}</th>
              <th key={index}>
                {dataItem.vendor_name ? dataItem.vendor_name : "Vendor"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th
              onClick={() => toggleColumn("item")}
              style={{ cursor: "pointer" }}
            >
              item {cols.length}
            </th>
            {renderValueHeaders()}
          </tr>
          {!hiddenColumns.includes("item") && (
            <tr>
              <td>
                {cols.map((dataItem, index) => (
                  <ul key={index}>
                    <li>{dataItem}</li>
                  </ul>
                ))}
              </td>
              {/* {data.map((dataItem, index) => (
                <td key={index}>
                  <ul>
                    <li>{dataItem.quoted_price}</li>
                  </ul>
                </td>
              ))} */}
              {alldata.map((dataItem, index) => (
                <td key={index}>
                  <ul>
                    {dataItem.quote_items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item.quoted_price}</li>
                    ))}
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
};

export default Page;
