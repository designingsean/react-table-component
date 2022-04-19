import React, { useState, useEffect } from "react";
import Button from "../Button";
import Checkbox from "../Checkbox";
import { ReactComponent as DownloadIcon } from "../../assets/icons/download.svg";
import "./styles.css";

function DownloadTable (props) {
  const [rows, setRows] = useState(props.data.map(row => ({...row, isChecked: false})));
  const [selectedData, setSelectedData] = useState([]);
  const [countSelected, setCountSelected] = useState(0);
  const [buttonState, setButtonState] = useState(true);
  const [massSelectCheckedState, setMassSelectCheckedState] = useState('unchecked');

  const maxAvailable = rows.filter(row => row.status === 'available').length;

  useEffect(() => {
    setSelectedData(
      rows.filter(row => row.isChecked === true)
    )
  }, [rows]);

  useEffect(() => {
    setCountSelected(
      selectedData.length
    )
  }, [selectedData]);

  useEffect(() => {
    switch (countSelected) {
      case 0:
        setButtonState(true);
        setMassSelectCheckedState('unchecked');
        break;
      case maxAvailable:
        setButtonState(false);
        setMassSelectCheckedState('checked');
        break;
      default:
        setButtonState(false);
        setMassSelectCheckedState('indeterminate');
    }
  }, [countSelected, maxAvailable]);

  const handleCheckboxClick = function (index) {
    setRows(
      rows.map((row, currentIndex) => {
        if (currentIndex === index) {
          return {...row, isChecked: !row.isChecked}
        } else {
          return row
        }
      })
    )
  }

  const handleMassCheckboxClick = function (event) {
    setRows(
      rows.map((row) => {
        if (row.status === 'available') {
          return {...row, isChecked: event.target.checked}
        } else {
          return row
        }
      })
    )
  }

  const handleDownloadClick = function () {
    let message = "Data to be downloaded:"
    selectedData.map((item) => 
      message += "\n\nDevice: " + item.device + "\nPath: " + item.path
    )
    alert(message);
  }

  const rowDisplay = rows.map((row, index) =>
    <tr key={`row-${index}`} className={row.isChecked ? 'active' : ''}>
      <td>
        <Checkbox
          index={index}
          ariaLabel="Select Row"
          isChecked={row.isChecked ? 'checked' : 'unchecked'}
          isDisabled={(row.status !== 'available') ? true : false}
          handleChange={()=>{handleCheckboxClick(index)}}
        />
      </td>
      <td>{row.name}</td>
      <td>{row.device}</td>
      <td>{row.path}</td>
      <td><span className={row.status}></span>{row.status}</td>
    </tr>
  )

  return (
    <table>
      <caption>
        <Checkbox
          ariaLabel="Select All"
          isChecked={massSelectCheckedState}
          handleChange={(event)=>{handleMassCheckboxClick(event)}}
        />
        {props.title} ({countSelected===0 ? "none" : countSelected} selected)
        <Button
          clickHandler={handleDownloadClick}
          disabled={buttonState}
        >
          <DownloadIcon style={{marginRight: "10px", width: "15px"}} /> Download Selected
        </Button>
      </caption>
      <thead>
        <tr>
          <th width="5%" aria-label="Select"></th>
          <th width="15%">Name</th>
          <th width="15%">Device</th>
          <th>Path</th>
          <th width="10%">Status</th>
        </tr>
      </thead>
      <tbody>
        {rowDisplay}
      </tbody>
    </table>
  )
}

export default DownloadTable;