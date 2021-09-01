let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let url = 'https://codeforces.com/api/contest.list'
let i = 0;
fetch(url)
    .then(res => res.json())
    .then(data => //console.log(data.result[0].startTimeSeconds*1000, Date.now())
        data.result.forEach(el => {
            if (el.startTimeSeconds * 1000 > Date.now()) {
                i++;
                let unix_timestamp = el.startTimeSeconds
                let date = new Date(unix_timestamp * 1000);
                let year = date.getFullYear();
                let month = months[date.getMonth()];
                let day = date.getDate();
                let hours = date.getHours();
                let minutes = "0" + date.getMinutes();
                let seconds = "0" + date.getSeconds();
                let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
                let formattedDate =  month + ' '+ day + ', ' + year;
                let toAdd =`<tr>
                <th scope="row">${i}</th>
                <td>${el.id}</td>
                <td>${el.name}</td>
                <td>${formattedDate}</td>
                <td>${formattedTime}</td>
                <td><a href = "https://codeforces.com/contests/${el.id}" >Register</a></td>
              </tr>`
                let contest = `<li>${el.id}:${el.name} at ${formattedTime}</li>`;
                document.getElementById("contestList").innerHTML += toAdd;
        }
        })
    )
    .catch(error => console.log('ERROR'))