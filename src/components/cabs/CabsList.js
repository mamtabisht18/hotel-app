import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'Source',
    dataIndex: 'source',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  // {
  //   title: 'De',
  //   dataIndex: 'age',
  //   key: 'age',
  // },
  {
    title: 'Destination',
    dataIndex: 'destination',
    key: 'address',
  },

  {
    title: 'Distance',
    dataIndex: 'distance',
    key: 'distance',
  },

  {
    title: 'Fair',
    dataIndex: 'fair',
    key: 'fair',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  // {
  //   title: 'Tags',
  //   key: 'tags',
  //   dataIndex: 'tags',
  //   render: tags => (
  //     <>
  //       {tags.map(tag => {
  //         let color = tag.length > 5 ? 'geekblue' : 'green';
  //         if (tag === 'loser') {
  //           color = 'volcano';
  //         }
  //         return (
  //           <Tag color={color} key={tag}>
  //             {tag.toUpperCase()}
  //           </Tag>
  //         );
  //       })}
  //     </>
  //   ),
  // },
];

const data = [
  {
    key: '1',
    source: 'John Brown',
    distance: 32,
    fair: 100,
    destination: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    source: 'John Brown',
    distance: 32,
    fair: 100,
    destination: 'New York No. 1 Lake Park',
  },
  {
    key: '3',
    source: 'John Brown',
    distance: 32,
    fair: 100,
    destination: 'New York No. 1 Lake Park',
  },
];


const CabsList = () =>{
  return <Table columns={columns} dataSource={data} />
}

export default CabsList;
