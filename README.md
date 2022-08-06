
Link da API: https://kenzie-buster-btrz.herokuapp.com/

Ferramentas utilizadas
<ul>
<li>NodeJS + Express</li>
<li>TypeORM</li>
<li>Deploy no Heroku</li>
</ul>



<h2>Regras da aplicação</h2>

<ol>
<li> Criação de usuário deve conter autenticação, para que, apenas admin's possam criar outros admin's: </li>
<li>Sua aplicação já deve conter um admin no banco com as seguintes credenciais:
<p>
email: kenzie@mail.com
senha: umaSenhaForte!
</p>
</li>
<li>Email do usuário é ÚNICO, caso tente fazer criação de um usuário com um email já existente deve estourar um erro com o status 409 CONFLICT.</li>
<li>O email DEVE ser salvo em lowercase.</li>
<li>Apenas um usuário admin pode criar um dvd.</li>
<li>Apenas um usuário admin pode criar outro admin.</li>
<li>O dvd só será subtraído do estoque a partir do pagamento.</li>
<li>Ao fazer uma compra a quantidade comprada deve ser abatida do estoque.</li>
<li>Os status code e retorno deve ser igual aos exemplos abaixo.</li>

</ol>




