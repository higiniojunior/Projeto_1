# Notas do Projeto

Anotações internas: pendências, decisões e políticas do projeto que não cabem no código.
Não é documentação técnica (isso fica no CLAUDE.md) — é só um lugar pra não esquecer combinados.

## Pendências

- [ ] **Política de privacidade** (`privacidade.html`): atualizar mencionando a coleta de
  email/senha via Firebase Authentication. Esperar definirmos o que o login vai permitir
  fazer (ex: salvar histórico, Firestore) antes de escrever o texto final.

## Decisões / políticas internas

- Versionamento: `main` = linha 1.x (site básico, publicado), branch `firebase` = linha 2.x
  (com login/inscrição). Ver conversa no histórico do Claude Code para detalhes.
