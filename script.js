// Function to add a vote
async function addVote() {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;

    // Check if both name and category are selected
    if (name && category) {
        try {
            const response = await fetch('https://crudcrud.com/api/b6986f86a27144fb9e674c277adcf62f/votesData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, category })
            });

            if (response.ok) {
                // Increment total votes count
                const totalVotesElement = document.getElementById('total-votes-count');
                totalVotesElement.textContent = parseInt(totalVotesElement.textContent) + 1;

                // Increment category total
                const categoryTotalElement = document.getElementById(`${category}-total`);
                categoryTotalElement.textContent = `Total: ${parseInt(categoryTotalElement.textContent.split(':')[1].trim()) + 1}`;

                // Show vote in the list
                showVotes(category, name);
            } else {
                console.error('Failed to add vote');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert('Please enter both name and select a category.');
    }
}
sync function deleteVote(name, category) {
    try {
        const response = await fetch(`https://crudcrud.com/api/b6986f86a27144fb9e674c277adcf62f/votesData?&name=${name}&category=${category}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Decrement total votes count
            const totalVotesElement = document.getElementById('total-votes-count');
            totalVotesElement.textContent = parseInt(totalVotesElement.textContent) - 1;

            // Decrement category total
            const categoryTotalElement = document.getElementById(`${category}-total`);
            categoryTotalElement.textContent = `Total: ${parseInt(categoryTotalElement.textContent.split(':')[1].trim()) - 1}`;

            // Remove vote from the list
            const voteList = document.getElementById(`${category}-list`);
            const voteEntries = voteList.getElementsByClassName('vote-entry');
            for (let i = 0; i < voteEntries.length; i++) {
                const voteEntry = voteEntries[i];
                //if (voteEntry.firstChild.textContent === name) {
                    if (voteEntry.firstChild.textContent.trim().toLowerCase() === name.toLowerCase()) { 
                    voteEntry.remove();
                    break;
                }
            }
        } else {
            console.error('Failed to delete vote');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to show votes in the list for the chosen category
async function showVotes(category, name) {
    const voteList = document.getElementById(`${category}-list`);
    const voteEntry = document.createElement('div');
    voteEntry.classList.add('vote-entry');
    voteEntry.innerHTML = `
        <p>${name}</p>
        <button onclick="deleteVote('${category}', '${name}')">Delete</button>
    `;
    voteList.appendChild(voteEntry);
}
