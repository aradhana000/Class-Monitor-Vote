const BASE_URL = 'https://crudcrud.com/api/2abafa8f3f3d4da2850eb11bbdb2cd19/votes';

async function handleSubmit(event) {
  event.preventDefault();

  const name = event.target.name.value.trim();
  const monitor = event.target.monitor.value.trim();

  if (!name || !monitor) {
    alert("Name and monitor cannot be empty.");
    return;
  }

  const obj = {
    name,
    monitor,
    obj_id: null
  };

  try {
    const result = await axios.post(BASE_URL, obj);
    obj._id = result.data._id;
    console.log(result);
    displayVotes(obj);
    updateTotalVotes();
    updateMonitorTotal(obj.monitor);
  } catch (error) {
    console.error("Error submitting vote:", error);
  }

  event.target.reset();
}

function createDeleteButton(obj) {
  const delBtn = document.createElement('button');
  delBtn.innerHTML = '&#10008';
  delBtn.onclick = async () => {
    try {
      await axios.delete(`${BASE_URL}/${obj._id}`);
      console.log("Vote deleted successfully.");
      delBtn.parentElement.remove();
      updateTotalVotes();
      updateMonitorTotal(obj.monitor);
    } catch (error) {
      console.error("Error deleting vote:", error);
    }
  };
  return delBtn;
}

async function updateTotalVotes() {
  try {
    const result = await axios.get(BASE_URL);
    document.getElementById('total-votes').innerHTML = `Total: ${result.data.length}`;
  } catch (error) {
    console.error("Error updating total votes:", error);
  }
}

async function updateMonitorTotal(monitor) {
  try {
    const result = await axios.get(BASE_URL);
    const total = result.data.filter(item => item.monitor === monitor).length;
    document.getElementById(`${monitor.toLowerCase()}-total`).innerHTML = `Total: ${total}`;
  } catch (error) {
    console.error("Error updating monitor total:", error);
  }
}

async function displayVotes(obj) {
  const monitorList = document.getElementById(obj.monitor.toLowerCase());
  const list = document.createElement('li');
  list.innerHTML = obj.name;

  const delBtn = createDeleteButton(obj);
  list.appendChild(delBtn);
  monitorList.appendChild(list);
}

async function initialize() {
  try {
    const result = await axios.get(BASE_URL);
    document.getElementById('total-votes').innerHTML = `Total: ${result.data.length}`;

    const monitors = ['Suresh', 'Mahesh', 'Ganesh'];
    for (const monitor of monitors) {
      const total = result.data.filter(item => item.monitor === monitor).length;
      document.getElementById(`${monitor.toLowerCase()}-total`).innerHTML = `Total: ${total}`;
    }

    for (const item of result.data) {
      displayVotes(item);
    }
  } catch (error) {
    console.error("Error initializing:", error);
  }
}

window.addEventListener('DOMContentLoaded', initialize);
document.getElementById('vote-form').addEventListener('submit', handleSubmit);

      
  

 

                
