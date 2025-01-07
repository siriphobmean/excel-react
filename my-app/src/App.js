import { useState } from "react";
import * as XLSX from "xlsx";
import { Table } from "antd";  // นำเข้า Table จาก antd
// import 'antd/dist/reset.css'; // เรียกใช้ CSS ของ Ant Design
import './App.css';

function App() {
  const [data, setData] = useState([]);

  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);
      setData(parsedData);
    };
  };

  // กำหนดคอลัมน์ให้กับตารางใน Ant Design
  const columns = data.length > 0 ? Object.keys(data[0]).map(key => ({
    title: key, 
    dataIndex: key,
    key: key,
  })) : [];

  return (
    <div className="App">
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileUpload} 
      />
      
      {data.length > 0 && (
        <Table 
          columns={columns} 
          dataSource={data} 
          rowKey={(record, index) => index.toString()}  // ใช้ index เพื่อเป็น row key
        />
      )}

      <br /><br />
      ... webstylepress ...
    </div>
  );
}

export default App;