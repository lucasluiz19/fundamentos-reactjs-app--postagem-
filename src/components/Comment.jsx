import { ThumbsUp, Trash } from 'phosphor-react'
import { useState } from 'react'
import { Avatar } from './Avatar'
import styles from './Comment.module.css'

export function Comment({content,onDeteleComments}){
    const [likeComment, setLikeComment]= useState(0)

    function handleDeleteComment(){
        onDeteleComments(content)
    }
    function handleLikeComment(){
        setLikeComment((state)=> {
            return state + 1
        })
    }

    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/lucasluiz19.png"  />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                      <div className={styles.authorAndTime}>
                        <strong>Lucas Luiz </strong>
                        <time title='19 de junho ás 16:32' dateTime="2023-06-19 16:23:12">Cerca de 1h atrás</time>
                      </div>
                      <button onClick={handleDeleteComment} title='Deletar comentário'>
                        <Trash size={24}/>
                      </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp/>
                        Aplaudir <span>{likeComment}</span>
                    </button>
                </footer>

            </div>
        
        </div>
    )
}