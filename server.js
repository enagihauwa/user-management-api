import http from 'http';
const users = [
    { id: 1, name: 'Sani', age: 24 },
    { id: 2, name: 'Ghost', age: 32 },
    { id: 3, name: 'ABU', age: 47 },
];


const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.statusCode = 200;
        res.write('Welcome to my API');
        return res.end();
    }
    else if (req.url === '/users') {

        if (req.method === 'POST') {
            console.log('Creating a new user');
            const data = [];
            req.on('data', chunck => {
                data.push(chunck);
            });
            req.on('end', () => {
                const userData = Buffer.concat(data).toString();
                const parsedData = JSON.parse(userData);

                const missingFields = [];
                if (parsedData.id === undefined) missingFields.push('id');
                if (parsedData.name === undefined) missingFields.push('name');
                if (parsedData.age === undefined) missingFields.push('age');

                if (missingFields.length > 0) {
                    res.statusCode = 400;
                    res.write('Bad request: No user data provided or missing fields: ' + missingFields.join(', '));
                    return res.end();
                }
                res.statusCode = 201;
                users.push(parsedData);
                res.write(JSON.stringify(users));
                return res.end();
            });
        }
        else if (req.method === 'GET') {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');

            res.write(JSON.stringify(users));
            return res.end();
        }
        else {
            res.statusCode = 405;
            res.write('Method not allowed');
            return res.end();
        }
    }
    else {
        res.statusCode = 404;
        res.write('Not found');
        return res.end();

    }
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})