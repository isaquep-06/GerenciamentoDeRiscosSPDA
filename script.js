function Calcular() {
    // Buscar valores dos inputs (dados da estrutura)
    const NG = parseFloat(document.querySelector('#NG').value);
    const L = parseFloat(document.querySelector('#L').value);
    const W = parseFloat(document.querySelector('#W').value);
    const H = parseFloat(document.querySelector('#H').value);
    const CD = parseFloat(document.querySelector('#CD').value);

    // 1. Cálculo da área AD 
    const AD = (L * W) + (2 * (3 * H) * (L + W)) + (Math.PI * (3 * H) ** 2);

    // 2. Cálculo do número de descargas ND
    const ND = NG * AD * CD * 1e-6;

    // Buscar valores dos inputs (probabilidades de perda)
    const PA = parseFloat(document.querySelector('#PA').value);
    const PB = parseFloat(document.querySelector('#PB').value);
    const PC = parseFloat(document.querySelector('#PC').value);
    const PM = parseFloat(document.querySelector('#PM').value);

    // Níveis de proteção (fatores de dano)
    const LA = parseFloat(document.querySelector('#LA').value);
    const LB = parseFloat(document.querySelector('#LB').value);
    const LC = parseFloat(document.querySelector('#LC').value);
    const LM = parseFloat(document.querySelector('#LM').value);

    // Cálculo dos riscos
    const RA = ND * PA * LA;
    const RB = ND * PB * LB;
    const RC = ND * PC * LC;
    const RM = ND * PM * LM;

    const Rtotal = RA + RB + RC + RM;

    // Selecionar tipo de risco do <select>
    const select = document.querySelector('#tipoRisco');
    const tipo = select.value;

    let RT = 0;
    let Rselecionado = 0;

    // Definir o limite tolerável e o risco correspondente
    switch (tipo)/*(tipo)value do select*/ {
        case 'RA':
            RT = 10**-5;
            Rselecionado = RA;
            break;
        case 'RB':
            RT = 10**-4;
            Rselecionado = RB;
            break;
        case 'RC':
            RT = 10**-4;
            Rselecionado = RC;
            break;
        case 'RM':
            RT = 10**-3;
            Rselecionado = RM;
            break;
        default:
            RT = 0;
            break;
    }

    // Comparação com o limite tolerável (RT)
    const situacao = (Rselecionado > RT) ? "Necessita proteção" : "Proteção não obrigatória";

    // Exibir resultado na tela
    document.querySelector('#resultado').innerHTML = `
        <strong>Resultados:</strong><br>
        Área de exposição equivalente Total (AD) = ${AD.toFixed(2)} m² <br>
        Número de Descargas (ND) = ${ND.toExponential(5)} <br>
        Risco calculado (${tipo}): ${Rselecionado.toExponential(5)} <br>
        Limite tolerável (${tipo}): ${RT.toExponential(5)} <br>
        Situação: <b>${situacao}</b>
    `;
}
