const data = []
for (let i=0; i<21; i++) {
    data.push({
        "Emails": Math.floor(Math.random() * 21),
        "Words": Math.floor(Math.random() * 101),
        "Servers": Math.floor(Math.random() * 8),
    })
}
console.log(data)