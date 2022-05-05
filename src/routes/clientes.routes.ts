import { Router } from "express";
import { cliente } from '../models/cliente';
import { usuario } from '../models/usuario';
import { plano } from "../models/planos";
import { convidado } from "../models/convidados";
import xlsx from 'xlsx';

const router_cliente = Router();

async function importPlanilha(dados: any) {
    const result = await cliente.create(dados);
}

router_cliente.post('/importarPlanilha', async (req, res) => {
    const file = xlsx.readFile('E:/projetos/parafall/api_parafall/src/routes/filiados.xlsx');

    const sheets = file.SheetNames

    for (let i = 0; i < sheets.length; i++) {
        const temp = xlsx.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
        temp.forEach((res: any) => {
            let idPlano = 0;

            if (res.titulo == 'FILIADO - DIAMANTE') idPlano = 4;
            if (res.titulo == 'FILIADO - OURO') idPlano = 3;
            if (res.titulo == 'FILIADO - PRATA') idPlano = 2;
            if (res.titulo == 'FILIADO - BRONZE') idPlano = 1;
            if (res.titulo == 'Investidor') idPlano = 5;
            if (res.titulo == 'Sócio Fundador') idPlano = 6;

            const data: any = {
                nome: res.atirador,
                telefone: res.telefones,
                data_nascimento: res.data_nascimento,
                cpf: res.cpf,
                rg: res.rg,
                rg_emissor: res.rg_emissor,
                endereco: res.endereco,
                cidade: res.cidade + ' ' + res.uf,
                email: res.email,
                idPlano: idPlano,
                mensalidade_anuidade: res.mensalidade_anuidade
            }
            importPlanilha(data);
        })
    }
})

router_cliente.post('/', async (req, res) => {
    const result: any = await cliente.create(req.body);
    
    if (req.body.idConvidante !== '')
        await convidado.create({ idConvidado: result.id, idConvidante: req.body.idConvidante });
    res.json({ status: 1, data: result });
})

router_cliente.put('/', async (req, res) => {
    const result = await cliente.update(
        req.body,
        {
            where: {
                id: req.body.id
            }
        });
    res.json({ status: 1, data: result });
});

router_cliente.delete('/:id', async (req, res) => {
    const result = await cliente.destroy({ where: { id: req.params.id } });
    res.json(result);
});

router_cliente.get('/', async (req, res) => {
    const result = await cliente.findAll({
        include: [
            {
                model: usuario,
                required: true
            },
            {
                model: plano,
                required: true
            },
        ],
        order: [
            ['nome', 'ASC'],
        ],
    });
    res.json(result);
});

router_cliente.get('/listar', async (req, res) => {
    const result = await cliente.findAll({
        attributes: [['id', 'code'], ['nome', 'name']],
        order: [
            ['nome', 'ASC'],
        ],
    });
    res.json(result);
})

export { router_cliente }