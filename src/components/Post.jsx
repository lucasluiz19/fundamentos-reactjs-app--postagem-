import styles from './Post.module.css'
import {format, formatDistanceToNow} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Comment } from "./Comment.jsx"
import { Avatar } from './Avatar'
import { useState } from 'react'

export function Post({author, publishedAt, content}){
    const [comments, setComment] = useState([
        'post muito bacana em?!'
    ])

    const [newCommentText, setNewCommentText]= useState(
        ''
    )

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h' ", {
        locale:ptBR
    })
    
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
        locale:ptBR,
        addSuffix:true
    })
    function handleCreateNewComment(){
        event.preventDefault()      
        setComment([...comments, newCommentText])
        setNewCommentText('')
        
    }
    function handleNewCommentChange() {     
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }
    function handleCommentValid(){
        event.target.setCustomValidity('esse campo é obrigatorio!')
      

    }
    function deteleComment(commentToDelete){
        const commentWithoutDeletedOne= comments.filter(comment=>{
            return comment !== commentToDelete
        })
        setComment(commentWithoutDeletedOne)
    }
    const isNewCommentEmpty= newCommentText.length==0
    
    return(
       <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder={true} src={author.avatarUrl}  />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>

            <div className={styles.content}>
                {
                    content.map(line=>{
                        if(line.type === 'paragraph'){
                            return <p key={line.content}> {line.content}</p>
                        }else if(line.type === 'link'){
                            return <p key={line.content}><a href='#'> {line.content}</a></p>
                        }
                    })
                }
            </div>
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea 
                    name='comment'
                    placeholder='escreva seu comentario'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleCommentValid}
                    required
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>
                        Publicar
                    </button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {
                    comments.map(comment =>{
                        return(
                            <Comment
                                key={comment}
                                content={comment}
                                value={newCommentText}
                                onDeteleComments={deteleComment}
                                
                            />
                        )
                    })
                }
            </div>
       </article>
    )
}