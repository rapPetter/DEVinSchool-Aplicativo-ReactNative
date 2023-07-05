# -Optado por ser variáveis e commits em português, descrevendo bem as funcionalidades e commits.!


# Guia de controle de versionamento

Este guia tem por objetivo descrever os procedimentos necessários ao desenvolvimento das tarefas que demandam o armazenamento em repositório com controle de versão. Esses procedimentos têm por objetivo organizar o processo de desenvolvimento, procurando classificar e separar código estável de código em produção, e ao mesmo tempo padronizar procedimentos.

---

## **Convenções**

- Utilizaremos a ferramenta git para realizar o controle de versionamento;
- No branch **main** está a versão estável de produção. Um merge só pode ser feito quando houver um release;
- branch **preview**
- O branch **dev** é o branch de… desenvolvimento… Para cada tarefa deve ser criado um branch no repositório remoto a partir dele. Não deve ser desenvolvido qualquer código diretamente sobre este branch.

## **Padrão de nomenclatura de branches**

**Bugfix:** B-<ticketID (se houver)>-<sufixo>. Ex.: B-22-PaginaQuebrada;

[BUGFIX]-B-56-buttonNotWorking

**Hotfix:** B-<ticketID (se houver)>-hotfix-<sufixo>. Ex.: B-23-hotfix-ModuloQuebrado;

[HOTFIX]-B-33-screenNotWorking

**Funcionalidade:** F-<ticketID (se houver)>-<sufixo>. Ex.: F-55-NovaFuncionalidade

F-54-newFeatura

**Release:** R-<epicID>-<sufixo>. Ex.: R-1.0.1-NovaRelease;

**Experimentação:** E-<nome do programador>-<sufixo>. Ex.: E-Samuel-OtimizacaoExperimental

## **Padrão de nomenclatura de tags de versão**

Uma tag de versão é caracterizada por V, seguido de 3 números, *major*, *minor* e *patch*, que representam o grau de mudança entre a versão passada e a nova versão, por exemplo: V1.2.14.

- *patch*: incrementado quando o release contém somente bugfixes ou adição de ajustes triviais, como a estilização de um componente pre-existente;
- *minor*: incrementado quando o release contém a adição de novas funcionalidades;
- *major*: incrementado quando houver um breaking change entre a versão anterior e a release, ou quando houver uma mudança significativa de funcionalidade. Por exemplo a remoção de código deprecado ou uma “rearquiteturização” da aplicação. Ou seja, uma *major release* informa que houveram grandes mudanças, que algumas funcionalidades podem não funcionar como anteriormente ou, ainda, novos passos precisam ser seguidos para obter o mesmo resultado.

---

## **Fluxo para desenvolvimento**

Para evitar problemas de sincronização/conflito, seguir o seguinte fluxo para desenvolvimento de nova tarefa:

1. Programador atualiza seu repositório/**branch originário** (por padrão **dev**): `git pull`;
2. Programador cria um branch local a partir do branch originário seguindo o padrão de nomenclatura: `git checkout -b <novo branch>`;
3. Programador compartilha o novo branch no repositório remoto: `git push --set-upstream origin <novo branch>`;
4. Programador trabalha no branch, efetuando commits quando necessário;
5. Com o trabalho finalizado e aprovado (fluxo Q.A.), o programador sincroniza este branch com o **branch originário**: `1# no branch de trabalho
2git merge dev
3# caso houver algum conflito, resolver no branch de trabalho
4git checkout <branch originario>
5git merge <novo branch>`

---

## **Fluxo para release**

Para integridade e organização, respeitar o seguinte fluxo para deploy de um novo release:

1. O deployer cria um branch a partir do branch **dev**, respeitando o padrão de nomenclatura: `git checkout -b <branch de release>`;
2. O deployer aplica quaisquer ajustes necessários;
3. O deployer certifica-se de não haver nenhum conflito entre **main** e o novo branch de release: `git merge main`;
4. No branch **main**, o deployer faz merge com o release e adiciona uma tag de versão:`1git checkout main
2git merge <branch de release>
3git tag <nome da tag>`
5. Por fim, o deployer sincroniza suas alterações com o repositório remoto: `git push --tags`



## **Criar a branch e enviar**
1. Clonar repositorio
2. git pull

3. git checkout -b  ex:F-05-CriandoTelaComTudo

4. Faz a alteração que precisa.

5. git add .
6. git commit -m "Descrever comit"
7. git pull

 ## **Outros comandos** 
 * git checkout ( voltar para main)
  
 * git revert (o codigo do comit)
  
 * git stash  (criar uma caixa e coloca o codigo que foi feito la)
 * git stash pop ( retira da caixa o que foi feito la)

  
