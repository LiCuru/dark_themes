Anotações sobre a ordem de processamento das classes do javascript.:

Fonte:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#evaluation_order

Entender a ordem, e de que forma acontece o processamento das classes em javascript é importante para entender muitas coisas.
O 'this', por exemplo: a palavra-chave, a keyword, 'this' referencia objetos diferentes dependendo de onde é declarada dentro de uma classe.

 O 'this' em um objeto vai se referir ao objeto que está fora do objeto onde ele é declarado. Você encontra esse objeto fora das chaves onde está o this.



this_object = { value: 1, retornar_this(){return this.value} } 
>>> Object { value: 1, retornar_this: retornar_this() }



this_object.retornar_this() 
>>> 1



this_object é um objeto com um "método" e uma "propriedade"

O 'this.value' e refere ao 'value' no escopo fora das {chaves onde 'this' estava}. retornar_this() é uma função. Funções também são objetos em javascrit. Ou seja, se é uma função, também é um objeto. Repare que quase todo o conteúdo de uma função é definido dentro de chaves, {}, da mesma forma que outros objetos.

--- funções também são objetos em javascript ---

In JavaScript, functions are first-class objects, because they can be passed to other functions, returned from functions, and assigned to variables and properties. They can also have properties and methods just like any other object. What distinguishes them from other objects is that functions can be called.

Function values are typically instances of Function. See Function for information on properties and methods of Function objects. Callable values cause typeof to return "function" instead of "object".

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions

------------------------------------------------



Ainda sobre funções serem objetos: O código da funçao está contido nas chaves, {}, que é a notação de objetos, e tem um protótipo próprio:

Repare:

this_object = 	{ 
		  value: 1, 
		  retornar_this(){
		    	return "o que existe entre as chaves da função ainda é um objeto. Value : " + this.value
		  }
	      	} 



this_object.retornar_this.__proto__ 
>>> function ()



this_object.__proto__
>>> Object { … }


this_object.retornar_this() 
>>> "o que existe entre as chaves da função ainda é um objeto1"

------------------------------------

Uma revisão rápida sobre classes, instâncias e protótipos.

Para entender classes em javascript é necessário entender o funcionamento de protótipos. Pois a implementação da programação orientada a objeto no javascript foi implementada através da existência desses protótipos.

As classes são objetos. Só que elas criam outros objetos. Esses objetos que as classes criam são chamados de instâncias. Quando um objeto é criado através de uma classe, se diz que a classe foi instanciada. Você chama a classe para criar a instância. Ou seja:

instância --> é objeto que a classe criou

instanciar a classe --> criar um objeto à partir de uma classe


É comum usar essa notação para instanciar uma classe:

instância_da_classe = new NomeDaClasse(parametro);

parâmetro --> é o que você passa entre parênteses na função. É só isso. Os valores propriamente ditos são chamados de argumentos.  Parâmetro se refere ao que você encontra na definição da função. O argumento é o que você passa de valor quando chama a função. No dia a dia é comum "parâmetro" e "argumento" serem usados como se fossem sinônimos, mas eles não são sempre sinônimos.

(https://stackoverflow.com/questions/156767/whats-the-difference-between-an-argument-and-a-parameter)

Funções construtoras --> são funções que criam objetos e os retornam. 



--- Classes e funções construtoras ---
Toda classe em javascript tem uma função construtora, o constructor. Isso porque toda classe devolve um objeto. É justamente isso o que define uma classe: o fato de instanciar objetos. A classe recebe (ou não recebe) parâmetros e devolve um objeto.


----------------------------------

Imagine as classes como uma forma de bolo. O bolo é a instância. E a massa é (ou são) o(s) parâmetro(s).  

Na classe, a função construtora da classe, ou seja, a função que retorna o objeto instanciado, é chamada de constructor.

Um 'this' para definir {uma propriedade dentro da função construtora} vai se referir ao objeto que envolve a função construtora, a classe, ou seja, um 'this' em uma propriedade na função construtora se refere ao escopo fora da função construtora.

É possível escrever e rodar esse exemplo de classe no navegador, no browser, pelo DevTools, atalho F12, indo direto no console. Uma classe pode ser escrita assim:

class Bolo{

    constructor(sabor, qtdFarinhag){
        this.sabor = sabor;
        this.qtdFarinhag = qtdFarinhag;
  }

    
    avisarQueTemBolo(){
        const qtdDePessoas = Math.round(this.qtdFarinhag/100);

        const aviso = 'tem bolo de ' + this.sabor +  ' para ' + qtdDePessoas + ' pessoas';

        return aviso;
  }
} 
>>> undefined


boloDeChocolate = new Bolo('chocolate', 1000);
>>> Object { sabor: "chocolate", qtdFarinhag: 1000 }


boloDeChocolate.avisarQueTemBolo();
>>>"tem bolo de chocolate para 10 pessoas"


boloDeChocolate;
>>> v Object { sabor: "chocolate", qtdFarinhag: 1000 }
​	 qtdFarinhag: 1000
​	 sabor: "chocolate"
​	v <prototype>: Object { … }


boloDeChocolate.__proto__ 
>>> v Object { … }
	​> avisarQueTemBolo: function avisarQueTemBolo()
	​> constructor: class Bolo { constructor(sabor, qtdFarinhag) }
	​v <prototype>: Object { … }



boloDeChocolate.__proto__ == Object.getPrototypeOf(boloDeChocolate) 
>>> true

----> repare que o objeto boloDeChocolate não tem o método .avisarQueTemBolo(). Quem tem o método .avisarQueTemBolo() é o boloDeChocolate.__proto__ , o protótipo· Mas você pode chamar direto do objeto boloDeChocolate.avisarQueTemBolo().

é mais fácil entender boloDeChocolate.__proto__ do que Object.getPrototypeOf(boloDeChocolate). Ambos devolvem o mesmo objeto que é o protótipo de boloDeChocolate. Só que:

boloDeChocolate.__proto__ ---> é um accessor, uma propriedade, que dá acesso ao prototype do objeto

Object.getPrototypeOf(boloDeChocolate) ---> é um método estático de Object, que busca o prototype do objeto passado como parâmetro.  Argumento = boloDeChocolate




--------------------------------------------

--- 'JavaScript is a prototype-based language' ---
https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript



--- 'JavaScript is a prototype-based language — an object's behaviors are specified by its own properties and its prototype's properties. However, with the addition of classes, the creation of hierarchies of objects and the inheritance of properties and their values are much more in line with other object-oriented languages' ---
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes


--- 'Nearly all objects in JavaScript are instances of Object; a typical object inherits properties (including methods) from Object.prototype' ---
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object


-------------------------------------------
Sobre protótipos

Quase todo objeto tem um protótipo. Ele ainda é acessível pelo nomeDoObjeto.__proto__ ,o que é bem mais didático, mas favorece que códigos sejam escritos de forma ruim, porque é possível alterar o __proto__, e alterar o protótipo de objetos não é boa prática.

Se não é um objeto, não tem protótipo, e, portanto, não tem nomeDoObjeto.__proto__

__proto__ sempre aponta para outro objeto. Se não apontar para outro objeto, __proto__ vai apontar para null. É possível alterar o __proto__ simplesmente definindo um valor para ele, ou então através de Object.defineProperty().

umObjeto = {} 
>>> Object {  }

criação de objeto



umObjeto.__proto__ 
>>> v Object { … }
​	> __defineGetter__: function __defineGetter__()
	> __defineSetter__: function __defineSetter__()
​	> __lookupGetter__: function __lookupGetter__()
​	> __lookupSetter__: function __lookupSetter__()
​	  __proto__: null
​	> constructor: function Object()
​	> hasOwnProperty: function hasOwnProperty()
​	> isPrototypeOf: function isPrototypeOf()
​	> propertyIsEnumerable: function propertyIsEnumerable()
​	> toLocaleString: function toLocaleString()
​	> toString: function toString()
​	> valueOf: function valueOf()
​	> <get __proto__()>: function __proto__()
​	> <set __proto__()>: function __proto__()





repare que o umObjeto.__proto__ é o Object { … } e que o seu o protótipo é nulo:

__proto__ : null

Esse é o protótipo final da cadeia de protótipos de todos os objetos que têm protótipo, ou seja de todos os objetos em que __proto__ não é nulo.



umObjeto.__proto__ = {'a' : 3} 
>>> v Object { a: 3 }
​	a: 3
​	<prototype>: Object { … }

dá pra alterar o __proto__ simplesmente definindo um valor pra ele, esse valor sempre precisa ser outro objeto. Se o valor definido para o __proto__ não for um objeto, não funciona.

Esse novo objeto apontado em __proto__ tem sua própria cadeia de protótipos. No caso, o protótipo de umObjeto.__proto__ é Object { … }. 

Se umObjeto.__proto__ fosse uma instância de uma classe, era diferente. O novo umObjeto.__proto__ ía deixar de ser o "protótipo final" e seria outro objeto com sua própria herança de sequência de protótipos.

Se usarmos a classe do tutorial do site do mozilla
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes#extends_and_inheritance)

podemos verificar esse exemplo:

class Color {
  #values;
  constructor(r, g, b, a = 1) {
    this.#values = [r, g, b, a];
  }
  get alpha() {
    return this.#values[3];
  }
  set alpha(value) {
    if (value < 0 || value > 1) {
      throw new RangeError("Alpha value must be between 0 and 1");
    }
    this.#values[3] = value;
  }
}

>>> undefined 


umaCor = new Color (0,0,0,0); 
>>> Object { #values: (4) […] }


umaCor 
>>> v Object { #values: (4) […] }
​	v #values: Array(4) [ 0, 0, 0, … ]
​	v <prototype>: Object { … }
​​		alpha: 
​​		> constructor: class Color { constructor(r, g, b, a) }
​​		> <get alpha()>: function alpha()
​​		> <set alpha()>: function alpha(value)
​​		> <prototype>: Object { … }
​​​		  > __defineGetter__: function __defineGetter__()
​​​		  > __defineSetter__: function __defineSetter__()
​​​		  > __lookupGetter__: function __lookupGetter__()
​​​		  > __lookupSetter__: function __lookupSetter__()
​​​		   __proto__: >>
​​​		  > constructor: function Object()
​​​		  > hasOwnProperty: function hasOwnProperty()
​​​		  > isPrototypeOf: function isPrototypeOf()
​​​ 		  > propertyIsEnumerable: function propertyIsEnumerable()
​​​		  > toLocaleString: function toLocaleString()
​​​		  > toString: function toString()
​​​		  > valueOf: function valueOf()
​​​		  > <get __proto__()>: function __proto__()
​​​		  > <set __proto__()>: function __proto__()




umObjeto = {} 
>>> v Object {  }
	v <prototype>: Object { … }
​​	   	> __defineGetter__: function __defineGetter__()
​​	   	> __defineSetter__: function __defineSetter__()
​		> __lookupGetter__: function __lookupGetter__()
​​		> __lookupSetter__: function __lookupSetter__()
​​		> __proto__: Object { … }
​​		> constructor: function Object()
​​		> hasOwnProperty: function hasOwnProperty()
​​		> isPrototypeOf: function isPrototypeOf()
​​		> propertyIsEnumerable: function propertyIsEnumerable()
​​		> toLocaleString: function toLocaleString()
​​		> toString: function toString()
​​		> valueOf: function valueOf()
​​		> <get __proto__()>: function __proto__()
​​		> <set __proto__()>: function __proto__()



umObjeto.__proto__
>>> v Object { … }
​	> __defineGetter__: function __defineGetter__()
​	> __defineSetter__: function __defineSetter__()
​	> __lookupGetter__: function __lookupGetter__()
​	> __lookupSetter__: function __lookupSetter__()
​	  __proto__: 
​	> onstructor: function Object()
​	> hasOwnProperty: function hasOwnProperty()
​	> isPrototypeOf: function isPrototypeOf()
​	> propertyIsEnumerable: function propertyIsEnumerable()
​	> toLocaleString: function toLocaleString()
​	> toString: function toString()
​	> valueOf: function valueOf()
​	> <get __proto__()>: function __proto__()
​	> <set __proto__()>: function __proto__()




umObjeto.__proto__ = umaCor 
>>> Object { #values: (4) […] }


umObjeto
>>> v Object {  }
​	<prototype>: Object { #values: (4) […] }



umObjeto.__proto__ 
>>> v Object { #values: (4) […] }
​	> #values: Array(4) [ 0, 0, 0, … ]
​	> <prototype>: Object { … }
​​	  alpha: 
​​	> constructor: class Color { constructor(r, g, b, a) }
​​	> <get alpha()>: function alpha()
​​	> <set alpha()>: function alpha(value)
​​	> <prototype>: Object { … }




umObjeto.__proto__.__proto__
>>> v Object { … }
​	  alpha: 
​	> constructor: class Color { constructor(r, g, b, a) }
​	> <get alpha()>: function alpha()
​	> <set alpha()>: function alpha(value)
​	> <prototype>: Object { … }
​​	   > __defineGetter__: function __defineGetter__()
​​	   > __defineSetter__: function __defineSetter__()
​​	   > __lookupGetter__: function __lookupGetter__()
​​	   > __lookupSetter__: function __lookupSetter__()
​​	     __proto__: 
​​	   > constructor: function Object()
​​	   > hasOwnProperty: function hasOwnProperty()
​​	   > isPrototypeOf: function isPrototypeOf()
​​	   > propertyIsEnumerable: function propertyIsEnumerable()
​​	   > toLocaleString: function toLocaleString()
​​	   > toString: function toString()
​​	   > valueOf: function valueOf()
​​	   > <get __proto__()>: function __proto__()
​​	   > <set __proto__()>: function __proto__()




umObjeto.__proto__.__proto__.__proto__ 
>>> v Object { … }
​	> __defineGetter__: function __defineGetter__()
	> __defineSetter__: function __defineSetter__()
	> __lookupGetter__: function __lookupGetter__()
	> __lookupSetter__: function __lookupSetter__()
	  __proto__: null
	> constructor: function Object()
	> hasOwnProperty: function hasOwnProperty()
	> isPrototypeOf: function isPrototypeOf()
	> propertyIsEnumerable: function propertyIsEnumerable()
	> toLocaleString: function toLocaleString()
	> toString: function toString()
	> valueOf: function valueOf()
	> <get __proto__()>: function __proto__()
	> <set __proto__()>: function __proto__()


umObjeto.__proto__.__proto__.__proto__.__proto__ 
>>> null




Além de __proto__ permitir a alteração do protótipo de um objeto, se um objeto já foi construído com protótipo nulo, definir um valor para nomeDoObjeto.__proto__ não vai alterar o protótipo, mas sim, criar uma nova propriedade chamada __proto__. Por isso essa propriedade __proto__ está sendo substituída.

__proto__ -->ainda<-- pode ser acessado. Em outras palavras: __proto__ está 'deprecated'.
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)

__proto__ está sendo substituído por:
Object.getPrototypeOf(nomeDoObjeto)

Object.getPrototypeOf(nomeDoObjeto) é um método estático, ou seja, é um método que só pode ser chamado diretamente do objeto Object, e não de nenhuma instância de Object. Por isso que a notação é:


nomeDoObjeto = {}
>>> Object {  }

criação do objeto nomeDoObjeto



nomeDoObjeto.__proto__
>>> Object { … }

ainda funciona, está deprecated, e é a mesma coisa que:



Object.getPrototypeOf(nomeDoObjeto)
>>> Object { … }

funciona


nomeDoObjeto.getPrototypeOf() -->
>>> Uncaught TypeError: nomeDoObjeto.getPrototypeOf is not a function

não funciona. "Não existe". É um método estático (static method). Mesmo que o protótipo da instância seja Object (repare que Object { … } é o protótipo do nomeDoObjeto), mesmo assim, não dá pra chamar pela instância. Você tem que chamar pelo Object, pois é um static method. Static methods (métodos estáticos) são isso: são métodos de classes que não são instanciados, ou seja, não estão nos objetos criados através daquela classe. Eles simplesmentes não estão na instância. 

Classes geram objetos, mas elas também não deixam de ser objetos. Se você tem uma classe chamada "NomeDaClasse" e jogar NomeDaClasse.__proto__ no console tu vai acessar o protótipo da classe NomeDaClasse. E tu pode acessar o protótipo do protótipo do protótipo... NomeDaClasse.__proto__.__proto__.__proto__ até chegar no final 

ou também:

Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Component)))
--> o que não é nada didático.

NomeDaClasse.__proto__.__proto__.__proto__
--> é mais fácil de entender


Mas enfim, voltando, tu pode acessar o protótipo do protótipo do protótipo, NomeDaClasse.__proto__.__proto__.__proto__ até chegar no final, que é comum a quase todos os objetos (todos em que o protótipo não é nulo).


Alguns protótipos são compartilhados entre os vários objetos de uma cadeia de herança. Se vc tem vários arrays, todos eles compartilham o mesmo protótipo que dá origem a todos os Arrays. O mesmo Array.__proto__

O jeito mais simples de verificar isso é indo no developer tools do browser (atalho: F12) e jogar no console nomeDoObjeto.__proto__ que ele roda o código e devolve o protótipo. Ou seja:

nomeDaArray = ['a', 'b', 'c']
>>> Array(3) [ "a", "b", "c" ]

nomeDaArray.__proto__
>>> Array []

nomeDaArray.__proto__.__proto__ 
>>> Object { … }

nomeDaArray.__proto__.__proto__.__proto__ 
>>> null


---> repare que __proto__ de Object { … } é null. Ele é o protótipo final de todos os objetos. Ele é assim:

      v Object { … }
	 > ​__defineGetter__: function __defineGetter__()
​	 > __defineSetter__: function __defineSetter__()
	​ > __lookupGetter__: function __lookupGetter__()
​	 > __lookupSetter__: function __lookupSetter__()
​	 > __proto__: null
​	 > constructor: function Object()
​	 > hasOwnProperty: function hasOwnProperty()
​	 > isPrototypeOf: function isPrototypeOf()
​	 > propertyIsEnumerable: function propertyIsEnumerable()
	​ > toLocaleString: function toLocaleString()
	​ > toString: function toString()
	​ > valueOf: function valueOf()
	​ > <get __proto__()>: function __proto__()
	​ > <set __proto__()>: function __proto__()



Existe um processo de transformar alguma coisa em outra coisa de forma automática pelo engine. Ele é chamado de coercion
sobre coercion
(https://www.freecodecamp.org/news/coercion-and-type-conversion-in-javascript/)



Esse link de um tutorial de javascript do mozilla.org tem exemplos interessantes pra rodar no console do DevTools.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes

IMPORTANTE:
É boa prática não fazer alterações em protótipos, ou seja, na propriedade __proto__, de qualquer objeto. Se for alterar alguma coisa, altere direto no objeto, ou na classe etc, não altere no protótipo. 
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

acessar a propriedade via '__proto__' está deprecated.

'some browsers are kind enough let you set and get [[Prototype]] through the __proto__ property'
(https://stackoverflow.com/questions/17174786/what-is-the-significance-of-the-double-brackets-for-the-prototype-property-i)

 Hoje em dia existe um getter e um setter (accessors) pra acessar a propriedade __proto__:

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

    --- processamento das classes em javascript ---

Ordem de processamento das classes:

PASSO 1 - extends --> O 'extends' faz referência a uma função construtora de outra classe (ou nulo, se não referencia nada). Quando a classe deriva de outra classe, ou seja, quando herda propriedades de outra classe,  "extends" aponta para a função construtora dessa classe de origem.

O NomeDaClasse.__proto__ = a classe-mãe. Se é uma classe base, o NomeDaClasse.__proto__ = algum outro objeto definido por default. É interessante verificar isso com o developer tools (atalho: F12) e os exemplos de classe herança desse link do mozilla:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes#extends_and_inheritance


PASSO 2 - constructor --> Não existe uma instância sem a função construtora dessa instância. A classe é um objeto que tem um construtor da instância que ela gera. Toda classe tem uma função construtora que vai gerar instâncias, senão, não é uma classe. O construtor sempre vai existir e é processado de alguma forma na criação da classe. Se não tiver declarado na classe, o engine vai processar um default.  Na sintaxe do javascript, o constructor é "só uma declaração de um método" da classe. É como se declarar o construtor fosse a mesma coisa que "sobreescrever" o default. Provavelmente é o que a sintaxe do javascript permite pra conseguir implementar o OOP, programação orientada a objeto.

O processamento do constructor não é observável.

Sobre construtores (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes)




PASSO 3 - as --chaves-- dos elementos da classe. A chave é o "nome" da propriedade. Os valores associados às keys (às chaves, aos "nomes") não são processados nessa etapa 3.

- computed key e 'this':
Se essa chave for uma computed key, ela é processada com o 'this' vinculado ao escopo exterior, ao qual a classe está imersa (não é um 'this' que se refere à classe em si). Computed keys são keys que precisam ser processadas, 'calculadas' para ter o valor delas, não é um valor estabelecido (uma string, uma int...). O computador precisa "calcular" ele.

Ou seja, voltando: ao processar o valor da key declarada na classe (se não for um valor já estabelecido), um "this" vai se referir ao escopo fora, que envolve a classe, e não à classe em si.
Exemplo de uma computed key: https://ilikekillnerds.com/2018/02/computed-object-keys-function-names-javascript/

---> Já um 'this' declarado no valor vinculado à chave (à key), e não à chave em si, vai se referir à classe, e não ao escopo fora da classe.



PASSO 4 - métodos e accessors são instalados na ordem em que são declarados.

O que são métodos e accessors:
Classes tem métodos e propriedades. De certa forma, os métodos são as funções das classes, e as propriedades são as variáveis. Os accessors são um tipo de "função" que chama uma propriedade. Ou seja, são funções que dão acesso a certas variáveis da classe.



Info sobre accessors:
https://javascript.info/property-accessors
https://stackoverflow.com/questions/42342623/why-use-getters-and-setters-in-javascript

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes#accessor_fields



As instalações são em 3 "camadas":

  - 4.1 - object.__proto__ --> Métodos e accessors da instância são instalados no protótipo da classe declarada. É o object.__proto__ . 
 
  - 4.2 - classe --> static métodos e accessors (métodos e accessors declarados com a keyword static) são gravados na classe mesmo, e não no protótipo da classe. Não são 'herdados' pela instância através do protótipo. São chamáveis na classe, e não na instância da classe.
 
  - 4.3 - instância --> métodos e accessors privados são instalados depois diretamente na instância. Eles são salvos para serem depois instalados diretamente na instância.
 

----------------------------------------------
--- sobre o static method ---

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_Classes#extends_and_inheritance

É possível verificar que static methods não são chamáveis através do 
objeto instanciado pela classe, mas sim pela classe em si.

Usando os exemplos do link do tutorial do Mozilla acima, é possível
verificar que só é possível chamar um static metahod da própria classe,
e não da sua instância.

Verificação:


class Color {
	//  o código da classe Color do link da página do Mozilla
}
>>> undefined

class ColorWithStatic extends Color {
    constructor(r, g, b, a ){
        super(r, g, b, a);
    }

    static static_method(){
        console.log('static method was called');
    }
}
>>> undefined

colorWithStatic_object = new ColorWithStatic(0,0,0,0)
>>> Object { ... }

colorWithStatic_object.static_method()
>>> Uncaught TypeError: colorWithStatic_object.static_method is not a function

ColorWithStatic.static_method()
>>> static method was called

colorWithStatic_object.__proto__.constructor
>>> class ColorWithStatic { constructor(r, g, b, a) }

colorWithStatic_object.__proto__.constructor.static_method()
>>> static method was called




----------------------------------------------



PASSO 5 - A classe é inicializada com:

--> o Object.__proto__ definido (ou não) pelo extends
--> a declaração (ou não) do constructor.
 
 
 
PASSO 6 - Os --valores-- dos elementos da classe são processados na ordem em que aparecem
 
 
 --- instance fields ---
 
 A classe é um objeto. A instância que deriva da classe é um objeto também.
 
 
 classe sem herança: 
 NomeDaClasse.__proto__  ---> é o protótipo definido por padrão 
 
 classe com herança
 NomeDaClasse.__proto__  ---> é a classe da qual ela deriva
 
 a instâcia da classe:
 InstanciaDaClasse.__proto__.constructor  ---> class NomeDaClasse
 

-- gravação das instance fields VALUES --
Quando a classe é criada, a expressão do inicializador de cada instance field é gravada.
 
O inicializador dos valores dos instance fields são processados, quando:

Quando a classe é instanciada, ou seja, quando são criados objetos à partir da classe.

Em que lugar:

 - em classes base  (que não derivam de outras classes)
 	-> no constructor() -  no começo do constructor
 
 - em classes derivadas de outra classe: 
 	-> no super() - logo antes dos retornos do super()
 
 
 
 --- static fields ---
 
 o inicializador dele é processado com 'this' já vinculado à própria classe
 
 
 
  --- static initialization blocks ---
 
 são processados com o 'this' vinculado à própria classe também
 
 
 
PASSO 7 - A classe está pronta para ser usada como uma função construtora
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
