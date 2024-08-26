const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
const app = express();

app.use(express.json());
app.use(cors());

// will need to change these to env variables before pushing to github
const clientConfig = {
  user: "postgres",
  host: "localhost",
  database: "reservation",
  password: "admin",
  port: 5432,
};

function createClient() {
  return new Client(clientConfig);
}

app.post("/api/signup", async (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "Signup successful", data: req.body });
});

app.get("/api/apps_retrival", async (req, res) => {
  console.log(req.body);

  const client = createClient();
  try {
    await client.connect();
    const get_appointments = await client.query("SELECT * from appointments");
    console.log(get_appointments.rows);
    if (get_appointments.rows.length > 0) {
      res.status(200).send({
        status: "success",
        body: get_appointments.rows,
        message: "Successfully retrieved all appointments",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  } finally {
    await client.end();
  }
});

app.get("/api/app_retrival/:app_id", async (req, res) => {
  const client = createClient();
  const app_id = req.params.app_id;

  try {
    await client.connect();

    const app_row = await client.query(
      "SELECT * FROM appointments WHERE app_id = $1",
      [app_id]
    );
    console.log(app_row.rows);
    if (app_row.rows.length > 0) {
      res.status(200).send({
        status: "success",
        body: app_row.rows[0],
        message: "Retrieved appointment",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  } finally {
    await client.end();
  }
});

app.post("/api/app-create", async (req, res) => {
  console.log(req.body);
  const { title, date, time, type, location, maxSlots } = req.body;
  const cur_slots = 0;
  const app_status = 1;
  const m_slots = parseInt(maxSlots);

  const client = createClient();
  try {
    await client.connect();
    const create_app = await client.query(
      "INSERT INTO appointments(app_date, app_time, app_type, app_location, app_status, cur_slots, max_slots, app_title) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [date, time, type, location, app_status, cur_slots, m_slots, title]
    );
    if (create_app.rows.length > 0) {
      res.status(201).send({
        status: "success",
        body: create_app.rows[0],
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "failed",
      body: "Internal server error",
    });
  } finally {
    await client.end();
  }
});

app.put("/api/app-edit/:id", async (req, res) => {
  console.log("edit body: ", req.body);
  const app_id = parseInt(req.params.id);
  const {
    app_title,
    app_date,
    app_time,
    app_type,
    app_location,
    app_status,
    cur_slots,
    max_slots,
  } = req.body;
  const c_slots = parseInt(cur_slots);
  const m_slots = parseInt(max_slots);
  const a_status = parseInt(app_status);
  const client = createClient();
  try {
    await client.connect();
    const edit_app = await client.query(
      "UPDATE appointments set app_title = $1, app_date = $2, app_time = $3, app_location = $4, app_status = $5, cur_slots = $6, max_slots = $7, app_type = $8 WHERE app_id = $9 RETURNING *",
      [
        app_title,
        app_date,
        app_time,
        app_location,
        a_status,
        c_slots,
        m_slots,
        app_type,
        app_id,
      ]
    );
    console.log(edit_app.rows);
    if (edit_app.rows.length > 0) {
      res.status(201).send({
        status: "success",
        body: edit_app.rows[0],
        message: "Appointment successfully updated",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "failed",
      body: "Internal server error",
    });
  } finally {
    await client.end();
  }
});

app.delete("/api/app-delete/:id", async (req, res) => {
  console.log("whats being deleted: ", req.body);
  const app_id = parseInt(req.params.id);
  const client = createClient();
  try {
    await client.connect();

    const delete_app = await client.query(
      "DELETE FROM appointments WHERE app_id =$1",
      [app_id]
    );

    res.status(200).send({
      status: "success",
      message: `appointment with id of ${app_id} has been successfully deleted`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  } finally {
    await client.end();
  }
});

app.get("/api/locs-retrival", async (req, res) => {
  console.log(req.body);
  const client = createClient();

  try {
    await client.connect();

    const location_row = await client.query("SELECT * FROM locations");
    if (location_row.rows.length > 0) {
      console.log(location_row.rows);
      res.status(200).send({
        status: "success",
        body: location_row.rows,
        message: "successfully retrived all locations",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  } finally {
    await client.end();
  }
});

app.get("/api/loc-retrival/:id", async (req, res) => {
  const client = createClient();
  const loc_id = req.params.id;

  try {
    await client.connect();

    const location_row = await client.query(
      "SELECT * FROM locations WHERE location_id =$1",
      [loc_id]
    );
    if (location_row.rows.length > 0) {
      res.status(200).send({
        status: "success",
        body: location_row.rows[0],
        message: `successfully retrieved data on location with id of ${loc_id}`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  } finally {
    await client.end();
  }
});
app.post("/api/loc-create", async (req, res) => {
  console.log(req.body);
  const client = createClient()
  const {name, streetAddress, city, state, zipcode} = req.body

  try {
    await client.connect();

    const loc_row = await client.query("INSERT INTO locations(location_name, location_street_address, location_city, location_state, location_zipcode)VALUES($1,$2,$3,$4,$5) RETURNING *", [name, streetAddress, city,state, zipcode])

    if(loc_row.rows.length > 0) {
      res.status(201).send({
        ststus: "success",
        body: loc_row.rows[0],
        message: "Created location"
      })
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failed",
      message: "Internal server error"
    })
  } finally {
    await client.end();
  }
  res
    .status(200)
    .json({ message: "Location created successfully", data: req.body });
});

app.put("/api/loc-edit/:id", async (req, res) => {
  console.log("edit body:", req.body);
  const client = createClient();
  const loc_id = parseInt(req.params.id);
  console.log(loc_id)
  const { loc_title, loc_street_address, loc_city, loc_state, loc_zipcode } =
    req.body;

  try {
    await client.connect();
    const edit_loc = await client.query(
      "UPDATE locations set location_name = $1, location_street_address = $2, location_city = $3, location_state = $4, location_zipcode = $5 WHERE location_id = $6 RETURNING *",
      [loc_title, loc_street_address, loc_city, loc_state, loc_zipcode, loc_id]
    );
    console.log(edit_loc.rows);
    if (edit_loc.rows.length > 0) {
      res.status(201).send({
        status: "success",
        body: edit_loc.rows[0],
        message: `successfully updated location with id of ${loc_id}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  } finally {
    await client.end();
  }
});

app.delete("/api/loc-delete/:id", async (req, res) => {
  console.log(req.body);
  const loc_id = parseInt(req.params.id);

  const client = createClient();

  try {
    await client.connect();

    const delete_loc = await client.query(
      "DELETE FROM locations WHERE location_id = $1",
      [loc_id]
    );

    res.status(200).send({
      status: "success",
      message: `appointment with id of ${loc_id} has been successfully deleted`,
    });
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
});

app.listen(5000, () => {
  console.log("app is listening on port 5000");
});