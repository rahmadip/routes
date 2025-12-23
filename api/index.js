require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());
app.use(cors());

const url = process.env.URL;
const key = process.env.KEY;
const supabase = createClient(url, key);

app.get('/', (req, res) => {
    res.send('Official rahmadip.github.io API');
});

app.get('/rahmadip', async (req, res) => {
    try {
        const { data, error, status } = await supabase
            .from('info')
            .select('*')
            .eq('display', true)
            .order('id', { ascending: true });
        if (error) {
            throw { error, status };
        }
        return res.json(data);
    } catch ({ error, status }) {
        return res.status(status).json({ status, error: error.message });
    }
});

app.get('/tools', async (req, res) => {
    try {
        const { data, error, status } = await supabase
            .from('svg')
            .select('*')
            .eq('display', true)
            .order('id', { ascending: true });
        if (error) {
            throw { error, status };
        }
        return res.json(data);
    } catch ({ error, status }) {
        return res.status(status).json({ status, error: error.message });
    }
});

app.get('/space', async (req, res) => {
    try {
        const { data, error, status } = await supabase
            .from('space')
            .select('*')
            .eq('display', true)
            .order('id', { ascending: true });
        if (error) {
            throw { error, status };
        }
        return res.json(data);
    } catch ({ error, status }) {
        return res.status(status).json({ status, error: error.message });
    }
});

module.exports = app;