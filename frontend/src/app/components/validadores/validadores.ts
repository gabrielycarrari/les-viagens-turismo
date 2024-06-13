import { AbstractControl, FormGroup } from "@angular/forms";


export class Validadores {
  static cpf(controle: AbstractControl) {
    let cpf = controle.value;

    cpf = cpf.replace(/[^\d]+/g, '');

    let soma: number = 0;
    let resto: number;
    let valido: boolean = true;

    const regex = new RegExp('^[0-9]{11}$');

    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      !regex.test(cpf)
    ) {
      valido = false;
    } else {
      for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) {
        valido = false;
      }

      soma = 0;
      for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) {
        valido = false;
      }
    }

    if (valido) return null;

    return { cpfInvalido: true };
  }

  static telefone(controle: AbstractControl) {
    const telefone = controle.value;

    const regex = new RegExp(/^(\(?\d{2}\)?[\s-]?)?(\d{4,5})[\s-]?(\d{4})$/);

    if (regex.test(telefone)) {
      return null;
    }

    return { telefoneInvalido: true };
  }

  static confirmPassword(form: FormGroup) {
    return (control: AbstractControl) => {
      const senha = form.get('senha');
      const confirmPassword = control.value;

      if (senha && confirmPassword && senha.value !== confirmPassword) {
        return { confirmPasswordInvalid: true };
      }

      return null;
    };
  }

  static cep(controle: AbstractControl) {
    let cep = controle.value;

    cep = cep.replace(/[^\d]+/g, '');

    const regex = new RegExp(/^\d{5}-?\d{3}$/);

    if (regex.test(cep)) {
      return null;
    }

    return { cepInvalido: true };
  }

  static cnpj(controle: AbstractControl) {
    let cnpj = controle.value;

    // Remove caracteres especiais (pontuação)
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) {
      return { cnpjInvalido: true };
    }

    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1+$/.test(cnpj)) {
      return { cnpjInvalido: true };
    }

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(0))) {
      return { cnpjInvalido: true };
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != parseInt(digitos.charAt(1))) {
      return { cnpjInvalido: true };
    }

    return null; // CNPJ válido
  }

}
