export default (props) => {

  const tasks = props?.tasks;

  const rows = tasks.map(task => {
    return (
      <tr key={task.id}>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <span>{ task.id }</span>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
          <p>{ task.note }</p>
        </td>
        <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
          <span>{ task.created_at }</span>
        </td>
        <td className="text-sm font-medium leading-5 whitespace-no-wrap border-b border-gray-200">
          <a id={task.id} onClick={props.onDelete} href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-600 hover:text-red-800"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full text-center">
            
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  ID
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Description
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Created_At
                </th>
                <th className="px-6 py-3 text-sm text-left text-gray-500 border-b border-gray-200 bg-gray-50" colSpan="3">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="bg-white">
              { rows }
            </tbody>

          </table>
        </div>
      </div>
    </div>
  )
}