/*Anotações sobre a ordem de processamento das classes do javascript.:

Fonte:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#evaluation_order

Entender a ordem, e de que forma acontece o processamento das classes em javascript é importante para muita coisas. O 'this', por exemplo: a palavra chave, a keyword, 'this' referencia objetos diferentes dependendo de onde é declarada.

--------------------------------------------

--- 'JavaScript is a prototype-based language' ---
https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript



--- 'JavaScript is a prototype-based language — an object's behaviors are specified by its own properties and its prototype's properties. However, with the addition of classes, the creation of hierarchies of objects and the inheritance of properties and their values are much more in line with other object-oriented languages' ---
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes


--- 'Nearly all objects in JavaScript are instances of Object; a typical object inherits properties (including methods) from Object.prototype' ---
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object


-------------------------------------------
Sobre protótipos

Todo objeto tem um nomeDoObjeto.__proto__ . Classes não deixam de ser objetos. Se você tem um objeto (uma classe) chamado "Component" e jogar Component.__proto__ no console, tu vai acessar o protótipo. E tu pode acessar o protótipo do protótipo do protótipo... Component.__proto__.__proto__.__proto__ até chegar no final, que é comum a todos os objetos. Os protótipos são compartilhados entre os objetos. Se vc tem vários arrays, todos eles compartilham o mesmo protótipo que dá origem a todos os Arrays. O mesmo Array.__proto__

O jeito mais simples de verificar isso é indo no developer tools do browser (atalho: F12) e jogar no console que ele roda.

Dá pra verificar as classes e os protótipos com developer tools e os exemplos do site dos tutoriais de javascript no mozilla.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes

É boa prática evitar fazer alterações em protótipos, ou seja, na propriedade __proto__, de qualquer objeto
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

acessar a propriedade via '__proto__' está deprecated. Hoje em dia existe um getter e um setter (accessors) pra acessar a propriedade __proto__:

 --> Object.getPrototypeOf()
 --> Object.setPrototypeOf()
 
Mas se for só pra observar um objeto direto no console, __proto__ é bem mais direta e fácil de entender, é mais didático que um getter pra entender o conceito da propriedade __proto__.

 
------------------------------------------
Sobre protótipos:

'JavaScript is a prototype-based language, and functions differently than the traditional class-based paradigm that many other object-oriented languages use.'
   
https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript
 
https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes

A descrição do que são objetos em Javascript também passa pela definição do protótipos:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
------------------------------------------



Ordem de processamento das classes:

1 - extends --> O 'extends' faz referência a uma função construtora de outra classe (ou nulo, se não referencia nada). Quando a classe deriva de outra classe, ou seja, quando herda propriedades de outra classe,  "extends" aponta para a função construtora dessa classe de origem. O NomeDaClasse.__proto__ da classe declarada é a classe que extends aponta. Se é uma classe base, o NomeDaClasse.__proto__ é algum outro objeto definido por default. Isso pode ser verificado com o developer tools (atalho: F12) e os exemplos do site do mozilla:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes#extends_and_inheritance




2 - constructor --> Não existe uma instância sem a função construtora desse objeto, ou seja, sem o construtor da classe. Toda classe tem uma função construtora. O construtor sempre é processado de alguma forma na criação da classe. Se não tiver declarado na classe, ele processa um default.  Na sintaxe do javascript, o constructor é "só" uma declaração de um método da classe, por isso o processamento do constructor não é observável. É o que a sintaxe do javascript permite, provavelmente. 

Sobre construtores (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes)




3 - as --chaves-- dos elementos da classe. A chave é o "nome" da propriedade. Os valores associados às keys (às chaves, aos "nomes") não são processados nessa etapa 3.

- computed key e 'this':
Se essa chave for uma computed key, ela é processada com o 'this' vinculado ao escopo exterior, ao qual a classe está imersa (não é um 'this' que se refere à classe em si). Computed keys são keys que precisam ser processadas, 'calculadas' para ter o valor delas, não é um valor estabelecido (uma string, uma int...). O computador precisa "calcular" ele. Ou seja, se ele for processar o valor da key declarada na classe (se não for um valor já estabelecido), um "this" vai se referir ao escopo fora, que envolve a classe, e não à classe em si.
Exemplo de uma computed key: https://ilikekillnerds.com/2018/02/computed-object-keys-function-names-javascript/




4 - métodos e accessors são instalados na ordem em que são declarados.

O que são métodos e accessors:
Classes tem métodos e propriedades. De certa forma, os métodos são as funções das classes, e as propriedades são variáveis. Os accessors são um tipo de "função" que chama uma propriedade. Ou seja, são funções que dão acesso á certas variáveis da classe.



Info sobre accessors:
https://javascript.info/property-accessors
https://stackoverflow.com/questions/42342623/why-use-getters-and-setters-in-javascript

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes#accessor_fields



As instalações são em 3 "camadas":

  - 4.1 - object.__proto__ --> Métodos e accessors da instância são instalados no protótipo da classe declarada. É o object.__proto__ . 
 
  - 4.2 - classe --> static métodos e accessors (métodos e accessors declarados com a keyword static) são gravados na classe mesmo, e não no protótipo da classe. Não são 'herdados' pela instância através do protótipo. São chamáveis, acessíveis, através do objeto da classe em si.
 
  - 4.3 - instância --> métodos e accessors privados são instalados depois diretamente na instância. Eles são salvos e depois são instalados diretamente na instância.
 

----------------------------------------------
--- static method ---

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes#extends_and_inheritance

É possível verificar que static methods não são chamáveis através do 
objeto instanciado pela classe. Se vc for no Developer Tools, F12, e
istanciar essa classe depois de rodar o código da classe Colors do
tutorial do Mozilla acima e tentar chamar o static_method do objeto,
vai ver que a instância não tem acesso a esse método da classe.
Quem tem acesso é a classe mesmo

Ou seja, se digitar no console:
*/

class Color {
	//  o código da classe Color do link da página do Mozilla
}
//>>> undefined

class ColorWithStatic extends Color {
    constructor(r, g, b, a ){
        super(r, g, b, a);
    }

    static static_method(){
        console.log('static method was called');
    }
}
//>>> undefined

colorWithStatic_object = new ColorWithStatic(0,0,0,0)
//>>> Object { ... }

colorWithStatic_object.static_method()
//>>> Uncaught TypeError: colorWithStatic_object.teste is not a function

ColorWithStatic.static_method()
//>>> static method was called

ColorWithStatic_object.__proto__.constructor
//>>> class ColorWithStatic { constructor(r, g, b, a) }

colorWithStatic_object.__proto__.constructor.static_method()
//>>> static method was called



/*

----------------------------------------------



 
 
 5 - A classe é inicializada com o Object.__proto__ definido pelo extends e pelo construtor da classe em si. 
 
 
 
 
 6 - Os --valores-- dos elementos da classe são processados na ordem em que aparecem
 
 
 
 --- instance fields ---
 
 A classe é um objeto. A instância que deriva da classe é um objeto também.
 
 
 classe sem herança: 
 NomeDaClasse.__proto__  ---> é o protótipo definido por padrão 
 
 classe com herança
 NomeDaClasse.__proto__  ---> é a classe da qual ela deriva
 
 a instâcia da classe:
 InstanciaDaClasse.__proto__.constructor  ---> class NomeDaClasse
 
 
Quando a classe é criada, a expressão do inicializador de cada instance field é gravada.
 
Quando a classe é instanciada, o inicializador do instance field é processado no começo do construtor, em classes base. Ou logo antes dos retornos da chamada do super().
 
 
 
 --- static fields ---
 
 o inicializador dele é processado com 'this' já vinculado à própria classe
 
 
 
  --- static initialization blocks ---
 
 são processados com o 'this' vinculado à própria classe também
 
 
 
 7 - A classe está pronta para ser usada como uma função construtora
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
