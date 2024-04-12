function handleSubmit(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const monitor = event.target.monitor.value;

  // Check if name or monitor is empty
  if (!name || !monitor) {
    alert('Please enter both name and select a monitor.');
    return;
  }

  //Storing details in object
  let obj = {
    name,
    monitor,
  };

  //Posting the object to the API endpoint
  axios
    .post(
      'https://crudcrud.com/api/b7f66d18b24e499a936f59daeeba4b75/Votes',
      obj
    )
    .then((result) => {
      console.log(result);
      displayVotes(obj);
    })
    .catch((error) => {
      console.log(error);
    });

  //Clearing the input fields
  event.target.name.value = '';
  event.target.monitor.value = '';
}

//Function to display the data
function displayVotes(obj) {
  const suresh = document.getElementById('suresh');
  const mahesh = document.getElementById('mahesh');
  const ganesh = document.getElementById('ganesh');

  const list = document.createElement('li');
  list.innerHTML = obj.name;

  const delBtn = document.createElement('button');
  delBtn.innerHTML = '&#10008';
  delBtn.onclick = () => {
    delBtn.parentElement.parentElement.removeChild(delBtn.parentElement);
    axios
      .delete(
        `https://crudcrud.com/api/b7f66d18b24e499a936f59daeeba4b75/Votes/${obj._id}`
      )
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  list.appendChild(delBtn);

  // Appending the list item to the correct category
  if (obj.monitor === 'Suresh') suresh.appendChild(list);
  else if (obj.monitor === 'Mahesh') mahesh.appendChild(list);
  else if (obj.monitor === 'Ganesh') ganesh.appendChild(list);
}

// Displaying the data on browser window load
window.addEventListener('DOMContentLoaded', () => {
  axios
    .get('https://crudcrud.com/api/b7f66d18b24e499a936f59daeeba4b75/Votes')
    .then((result) => {
      console.log(result);

      // Displaying total votes
      document.getElementById(
        'total-votes'
      ).innerHTML = `Total: ${result.data.length}`;

      // Displaying total votes for individual monitors
      let sureshTotal = 0;
      let maheshTotal = 0;
      let ganeshTotal = 0;
      for (val of result.data) {
        if (val.monitor === 'Suresh') sureshTotal++;
        else if (val.monitor === 'Mahesh') maheshTotal++;
        else if (val.monitor === 'Ganesh') ganeshTotal++;
      }
      document.getElementById(
        'suresh-total'
      ).innerHTML = `Total: ${sureshTotal}`;
      document.getElementById(
        'mahesh-total'
      ).innerHTML = `Total: ${maheshTotal}`;
      document.getElementById(
        'ganesh-total'
      ).innerHTML = `Total: ${ganeshTotal}`;

      // Calling the function to display the data
      for (val of result.data) displayVotes(val);
    })
    .catch((error) => {
      console.log(error);
    });
});
      

                
