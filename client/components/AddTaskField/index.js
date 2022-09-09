export default (props) => {

  return (
    <div className="mb-4">
      <form onSubmit={props.onSubmit}>
        <div className="flex justify-between space-x-4">
          <input onChange={props.handleForm} value={props.value} name="note" type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="add_task"
            aria-describedby="add_task" placeholder="Task"></input>
          <button type="submit" className="px-4 py-2 w-32 rounded-md bg-sky-500 text-sky-100 hover:bg-sky-600">Add Task</button>
        </div>
      </form>
    </div>
  )

}