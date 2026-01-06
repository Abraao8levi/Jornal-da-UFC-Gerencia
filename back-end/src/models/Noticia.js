const supabase = require('../config/database');

class Noticia {
    static async findAll() {
        const { data, error } = await supabase
            .from('noticias')
            .select('*')
            .order('data', { ascending: false });

        if (error) throw error;
        return data;
    }

    static async findById(id) {
        const { data, error } = await supabase
            .from('noticias')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    }

    static async findByCategoria(categoria) {
        const { data, error } = await supabase
            .from('noticias')
            .select('*')
            .eq('categoria', categoria)
            .order('data', { ascending: false });

        if (error) throw error;
        return data;
    }

    static async create(noticia) {
        const { data, error } = await supabase
            .from('noticias')
            .insert([noticia])
            .select();

        if (error) throw error;
        return data[0];
    }

    static async update(id, noticia) {
        const { data, error } = await supabase
            .from('noticias')
            .update(noticia)
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    }

    static async delete(id) {
        const { error } = await supabase
            .from('noticias')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    }

    static async findAprovadas() {
        const { data, error } = await supabase
            .from('noticias')
            .select('*')
            .eq('status', 'aprovado')
            .order('data', { ascending: false });

        if (error) throw error;
        return data;
    }

    static async findPendentes() {
        const { data, error } = await supabase
            .from('noticias')
            .select('*')
            .eq('status', 'pendente')
            .order('data', { ascending: false });

        if (error) throw error;
        return data;
    }

    static async updateStatus(id, status) {
        const { data, error } = await supabase
            .from('noticias')
            .update({ status })
            .eq('id', id)
            .select();

        if (error) throw error;
        return data[0];
    }
}

module.exports = Noticia;
