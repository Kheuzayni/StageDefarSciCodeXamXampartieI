const  question  =  document . getElementById ( 'question' ) ;
 choix  const =  tableau . from ( document . getElementsByClassName ( 'choix-texte' ) ) ;
const  progressText  =  document . getElementById ( 'progressText' ) ;
const  scoreText  =  document . getElementById ( 'score' ) ;
const  progressBarFull  =  document . getElementById ( 'progressBarFull' ) ;
const  loader  =  document . getElementById ( 'chargeur' ) ;
 jeu  const =  document . getElementById ( 'jeu' ) ;
laissez  currentQuestion  =  { } ;
laissez  acceptingAnswers  =  false ;
soit  score  =  0 ;
laissez  questionCounter  =  0 ;
laissez  availableQuesions  =  [ ] ;

laissez  questions  =  [ ] ;

chercher (
    «https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple»
)
    . alors ( ( res )  =>  {
        retourne  res . json ( ) ;
    } )
    . alors ( ( sharedQuestions )  =>  {
        questions  =  questions chargées . résultats . map ( ( sharedQuestion )  =>  {
            const  formatéQuestion  =  {
                question : sharedQuestion . question ,
            } ;

            const  answerChoices  =  [ ... sharedQuestion . incorrect_answers ] ;
            formattedQuestion . answer  =  Math . plancher ( Math . aléatoire ( )  *  4 )  +  1 ;
            answerChoices . épissure (
                formattedQuestion . réponse  -  1 ,
                0 ,
                chargéQuestion . bonne réponse
            ) ;

            answerChoices . forEach ( ( choix ,  index )  =>  {
                formattedQuestion [ 'choix'  +  ( index  +  1 ) ]  =  choix ;
            } ) ;

            return  formattedQuestion ;
        } ) ;

        startGame ( ) ;
    } )
    . attraper ( ( err )  =>  {
        console . erreur ( err ) ;
    } ) ;

// CONSTANTES
const  CORRECT_BONUS  =  10 ;
const  MAX_QUESTIONS  =  3 ;

startGame  =  ( )  =>  {
    questionCounter  =  0 ;
    score  =  0 ;
    availableQuesions  =  [ ... questions ] ;
    getNewQuestion ( ) ;
    jeu . classList . remove ( 'caché' ) ;
    chargeur . classList . add ( 'caché' ) ;
} ;

getNewQuestion  =  ( )  =>  {
    if  ( availableQuesions . length  ===  0  ||  questionCounter  > =  MAX_QUESTIONS )  {
        localStorage . setItem ( 'mostRecentScore' ,  score ) ;
        // aller à la page de fin
         fenêtre de retour . emplacement . assign ( '/end.html' ) ;
    }
    questionCounter ++ ;
    progressText . innerText  =  `Question $ { questionCounter } / $ { MAX_QUESTIONS } ` ;
    // Mettre à jour la barre de progression
    progressBarFull . le style . width  =  ` $ { ( questionCounter  /  MAX_QUESTIONS )  *  100 } %` ;

    const  questionIndex  =  Math . floor ( Math . random ( )  *  availableQuesions . length ) ;
    currentQuestion  =  availableQuesions [ questionIndex ] ;
    question . innerText  =  currentQuestion . question ;

    choix . forEach ( ( choix )  =>  {
         nombre  const =  choix . ensemble de données [ 'nombre' ] ;
        choix . innerText  =  currentQuestion [ 'choix'  +  nombre ] ;
    } ) ;

    availableQuesions . épissure ( questionIndex ,  1 ) ;
    acceptingAnswers  =  true ;
} ;

choix . forEach ( ( choix )  =>  {
    choix . addEventListener ( 'clic' ,  ( e )  =>  {
        if  ( ! acceptingAnswers )  return ;

        acceptingAnswers  =  faux ;
        const  selectedChoice  =  e . cible ;
        const  selectedAnswer  =  selectedChoice . ensemble de données [ 'nombre' ] ;

        const  classToApply  =
            selectedAnswer  ==  currentQuestion . réponse ? 'correct' : 'incorrect' ;

        if  ( classToApply  ===  'correct' )  {
            incrementScore ( CORRECT_BONUS ) ;
        }

        selectedChoice . parentElement . classList . ajouter ( classToApply ) ;

        setTimeout ( ( )  =>  {
            selectedChoice . parentElement . classList . supprimer ( classToApply ) ;
            getNewQuestion ( ) ;
        } ,  1 000 );
    } ) ;
} ) ;

incrementScore  =  ( num )  =>  {
    score  + =  num ;
    scoreText . innerText  =  score ;
};