import { useEffect, useState } from "react";
import {
  Grid,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
  GridRowClickEvent,
} from "@progress/kendo-react-grid";
import axios from "axios";
import "@progress/kendo-theme-default/dist/all.css";
import { student } from "./interfaces/data";

function App() {
  const [originalData, setOriginalData] = useState<Array<student>>([]);
  const [data, setData] = useState<Array<student>>([]);
  const [editId, setEditId] = useState<number | null>(null);

  const rowClick = (event: GridRowClickEvent) => {
    setEditId(event.dataItem.stdId);
  };

  const itemChange = (event: GridItemChangeEvent) => {
    const stdId = event.dataItem.stdId;
    const field = event.field || "";
    const newData = data.map((item) =>
      item.stdId === stdId
        ? {
            ...item,
            [field]: event.value,
          }
        : item
    );
    setData(newData);
  };

  const addRecord = () => {
    const newRec = { stdId: data.length + 1 };
    setData([newRec, ...data]);
  };

  const closeEdit = () => {
    setEditId(null);
  };

  const addData = async () => {
    for (let i = 0; i < data.length; i++) {
      let check = false;
      for (let j = 0; j < originalData.length; j++) {
        if (data[i].stdId == originalData[j].stdId) {
          check = true;
          break;
        }
      }
      if (!check) {
        postData(data[i]);
      }
    }
  };

  const postData = async (params: student) => {
    await axios
      .post("http://localhost:5951/add", params)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const updateCurrentRow = async () => {
    await axios
      .put(
        "http://localhost:5951/update",
        data.find((std) => std.stdId == editId)
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const deleteCurrent = async () => {
    await axios
      .delete(
        `http://localhost:5951/${
          data.find((std) => std.stdId == editId)?.stdId
        }`
      )
      .then((res) => {
        console.log(res.data);
        data.filter((std) => std.stdId != editId);
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch("http://localhost:5951/");
        // const resData = await response.json();
        // setData(resData);
        await axios.get("http://localhost:5951/").then((res) => {
          setData(res.data);
          setOriginalData(res.data);
        });
      } catch (e) {
        console.log("Error in getting data");
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1
        style={{
          width: "100%",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "40px",
        }}
      >
        STUDENT DETAILS
      </h1>
      <Grid
        data={data.map((item: student) => ({
          ...item,
          inEdit: item.stdId === editId,
        }))}
        style={{ height: "500px" }}
        editField="inEdit"
        onRowClick={rowClick}
        onItemChange={itemChange}
      >
        <GridToolbar>
          <button
            onClick={addRecord}
            title="Add new"
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          >
            Add new
          </button>
          <button
            title="close"
            onClick={closeEdit}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          >
            Close
          </button>
          <button
            title="post"
            onClick={addData}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          >
            Post
          </button>
          <button
            title="update"
            onClick={updateCurrentRow}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          >
            Update
          </button>
          <button
            title="Delete Row"
            onClick={deleteCurrent}
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
          >
            Delete
          </button>
        </GridToolbar>

        <Column field="stdId" title="ID" width="100px" editable={false} />
        <Column field="srn" title="SRN" editor="text" width="100px" />
        <Column field="name" title="Name" width="200px" editor="text" />
        <Column
          field="phoneNo"
          title="Phone Number"
          editor="numeric"
          width="150px"
        />
        <Column field="college" title="College" editor="text" />
      </Grid>
    </>
  );
}

export default App;
