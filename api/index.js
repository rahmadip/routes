require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.json());
app.use(
    cors(origin = 'https://rahmadip.github.io')
);

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
            .select('section, name, path, viewbox')
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

app.get('/tools/:tool', async (req, res) => {
    const { tool } = req.params;
    try {
        const { data, error, status } = await supabase
            .from('svg')
            .select('name, path, viewbox')
            .in('name', tool.split(','));
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
            .select('path, viewbox')
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

app.get('/projects', async (req, res) => {
    try {
        const { data, error, status } = await supabase
            .from('projects')
            .select('path, title, type, tools, tags, thumbnail')
            .eq('display', true)
            .order('id', { ascending: false });
        if (error) {
            throw { error, status };
        }
        return res.json(data);
    } catch ({ error, status }) {
        return res.status(status).json({ status, error: error.message });
    }
});

app.get('/projects/:path', async (req, res) => {
    const { path } = req.params;
    try {
        const { data, error, status } = await supabase
            .from('projects')
            .select('title, type, desc, tags, links, tools, contents, basis')
            .eq('path', path)
            .eq('display', true)
            .single();
        if (error) {
            throw { error, status };
        }
        return res.json(data);
    } catch ({ error, status }) {
        return res.status(status).json({ status, error: error.message });
    }
});

app.get('/projects/:path/neq', async (req, res) => {
    const { path } = req.params;
    try {
        const { data, error, status } = await supabase
            .from('projects')
            .select('path, title, type, thumbnail')
            .eq('display', true)
            .neq('path', path)
            .limit(5);
        if (error) {
            throw { error, status };
        }
        return res.json(data);
    } catch ({ error, status }) {
        return res.status(status).json({ status, error: error.message });
    }
});

app.post('/message', async (req, res) => {
    const { message, sender } = req.body;
    try {
        const { error, status, statusText } = await supabase
            .from('message')
            .insert({
                message: message,
                sender: sender
            });
        if (error) {
            throw { error, status };
        }
        return res.status(status).send(statusText);
    } catch ({ error, status }) {
        return res.status(status).json({ status, error: error.message });
    }
});

export default app;