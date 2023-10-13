import DashboardApiOutputPort from "@/core/application/ports/output/DashboardApiOutputPort";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import PixIcon from '@mui/icons-material/Pix';

import { DashboardDTO } from "@/core";

export default class ApiAdapter implements DashboardApiOutputPort {

    constructor() { }

    buscarDashboard(authorization: string) {
        const result:DashboardDTO =  {
            horizontalWidgets: [
                {
                    icone: "PIX",
                    descritivo: "Ticket médio PIX",
                    valor: "R$ 16.981,52"
                },
                {
                    icone: "POS",
                    descritivo: "Ticket médio POS",
                    valor: "R$ 2.456,99"
                },
                {
                    icone: "PIX",
                    descritivo: "Quantidade transações PIX",
                    valor: "222"
                },
                {
                    icone: "POS",
                    descritivo: "Quantidade transações POS",
                    valor: "542"
                }
            ],
            totalGeral: {
                "valor": "R$ 1.352,87",
                "variacao": 2.45,
                "data": [
                    {
                        "descritivo": "JAN",
                        "valor": 25060
                    },
                    {
                        "descritivo": "FEV",
                        "valor": 27980
                    },
                    {
                        "descritivo": "MAR",
                        "valor": 42800
                    },
                    {
                        "descritivo": "ABR",
                        "valor": 32400
                    },
                    {
                        "descritivo": "MAI",
                        "valor": 35200
                    },
                    {
                        "descritivo": "JUN",
                        "valor": 38200
                    },
                    {
                        "descritivo": "JUL",
                        "valor": 52160
                    },
                    {
                        "descritivo": "AGO",
                        "valor": 42400
                    },
                    {
                        "descritivo": "SET",
                        "valor": 35200
                    },
                    {
                        "descritivo": "OUT",
                        "valor": 38200
                    },
                    {
                        "descritivo": "NOV",
                        "valor": 52160
                    },
                    {
                        "descritivo": "DEZ",
                        "valor": 42400
                    }
                ]
            },
            totalTransacoes: [
                {
                    titulo: "PIX",
                    descritivo: "Total transações PIX",
                    valor: "R$ 1.352,87",
                    icone: "Pix",
                    variacao: 9.87,
                },
                {
                    titulo: "POS",
                    descritivo: "Total transações POS",
                    valor: "R$ 289.183,18",
                    icone: "POS",
                    variacao: -1.37,
                }
            ],
            tabelas: [
                {
                    "titulo": "Transações PIX",
                    "header": [
                        "chave",
                        "Participação",
                        "quantidade",
                        "Total"
                    ],
                    "body": [
                        [
                            "meucontato.projetos@gmail.com",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ],
                        [
                            "meucontato.projetos@gmail.com",
                            "17,69%",
                            "12",
                            "R$ 1.296,98"
                        ],
                        [
                            "meucontato.projetos@gmail.com",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ]
                    ]
                },
                {
                    "titulo": "Transações POS",
                    "header": [
                        "Flavor",
                        "Participação",
                        "quantidade",
                        "Total"
                    ],
                    "body": [
                        [
                            "Pagseguro",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ],
                        [
                            "Stone",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ],
                        [
                            "Vero",
                            "17,69%",
                            "12",
                            "R$ 3.896,98"
                        ]
                    ]
                }
            ],
        }
        return result;
    }
}