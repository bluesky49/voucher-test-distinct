import React from "react";
import "./style.css";

interface Props {
  data: any[]
}
const Table: React.FC<Props> = (props) => {
  const { data } = props;
  if (!data.length) return null;
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map(h => (
              <th key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d, index) => (
            <tr key={index}>
              {Object.values(d).map((i: any, index) => (
                <td key={index}>{i}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Table;
