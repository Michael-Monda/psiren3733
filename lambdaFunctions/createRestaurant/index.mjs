import mysql from 'mysql'

export const handler = async (event) => {
    var pool = mysql.createPool({
        host: "cs3733db.c5ia86k2epli.us-east-2.rds.amazonaws.com",
        user: "cs3733",
        password: "database720$",
        database: "Tables4u"
    });

    let createManagerAccount = (man_id, res_id, username, password) => {
        return new Promise((resolve,reject) => {
            pool.query("INSERT INTO Manager_Accounts (man_UUID, res_UUID, username, password) VALUES (?, ?, ?, ?)", 
            [man_id, res_id, username, password], (error, rows) => {
                if (error) { return reject(error); }
                return resolve(rows);
            })
        })
    }

    let createRestaurant = (id, name, address) => {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO All_Restaurants (res_UUID, restaurantName, address) VALUES (?, ?, ?)", 
                [id, name, address], (error, rows) => {
                if (error) { return reject(error); }
                return resolve(rows);
            })
        })
    }

    const ans = await createManagerAccount(event.man_UUID, event.res_UUID, event.username, event.password)
    const res = await createRestaurant(event.res_UUID, event.restaurantName, event.address);

    // this is what is returned to client
    const response = {
        statusCode: 200,
        result: {
            "res_UUID" : event.res_UUID,
            "man_UUID" : event.man_UUID
        }
    }

    pool.end()      // close DB connections

    return response;
}