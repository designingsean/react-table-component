import React, { useState, useEffect } from "react";
import { 
  Box,
  Button, 
  Checkbox, 
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer
} from '@chakra-ui/react'
import { MdFileDownload } from "react-icons/md";
import "./styles.css";

function DownloadTable (props) {
  const [rows, setRows] = useState(props.data.map(row => ({...row, isChecked: false})));
  const [selectedData, setSelectedData] = useState([]);
  const [countSelected, setCountSelected] = useState(0);
  const [buttonState, setButtonState] = useState(true);
  const [massSelectCheckedState, setMassSelectCheckedState] = useState(false);
  const [massSelectIndeterminateState, setMassSelectIndeterminateState] = useState(false);

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
        setMassSelectCheckedState(false);
        setMassSelectIndeterminateState(false);
        break;
      case maxAvailable:
        setButtonState(false);
        setMassSelectCheckedState(true);
        setMassSelectIndeterminateState(false);
        break;
      default:
        setButtonState(false);
        setMassSelectCheckedState(false);
        setMassSelectIndeterminateState(true)
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
    <Tr key={`row-${index}`} className={row.isChecked ? 'active' : ''}>
      <Td>
        <Checkbox
          index={index}
          isChecked={row.isChecked}
          isDisabled={(row.status !== 'available') ? true : false}
          onChange={()=>{handleCheckboxClick(index)}}
        />
      </Td>
      <Td>{row.name}</Td>
      <Td>{row.device}</Td>
      <Td>{row.path}</Td>
      <Td><span className={row.status}></span>{row.status}</Td>
    </Tr>
  )

  return (
    <TableContainer>
      <SimpleGrid columns={2} px={6} pt={6}>
        <Box textAlign='left'>
          <Checkbox
            pr={12}
            pt={1}
            isChecked={massSelectCheckedState}
            isIndeterminate={massSelectIndeterminateState}
            onChange={(event)=>{handleMassCheckboxClick(event)}}
          />
          {props.title} ({countSelected===0 ? "none" : countSelected} selected)
        </Box>
        <Box textAlign='right'>
          <Button
            variant='ghost'
            onClick={handleDownloadClick}
            isDisabled={buttonState}
            leftIcon={<MdFileDownload />}
          >
            Download Selected
          </Button>
        </Box>
      </SimpleGrid>
      <Table variant='simple'>
        <Thead>
          <Tr>
            <Th width="5%" aria-label="Select"></Th>
            <Th width="15%">Name</Th>
            <Th width="15%">Device</Th>
            <Th>Path</Th>
            <Th width="10%">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rowDisplay}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default DownloadTable;