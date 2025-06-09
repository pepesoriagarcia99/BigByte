// 1. Anotaciones de Repositorio
// @Repository
// Marca una interfaz o clase como un componente del repositorio. Se usa con @ComponentScan.

// 2. Anotaciones de Consulta
// @Query
// Define una consulta personalizada en JPQL o SQL.

// @Modifying
// Indica que una consulta @Query realiza una operación de modificación (INSERT, UPDATE, DELETE).

// @Procedure
// Llama a procedimientos almacenados desde el repositorio.

// @QueryHints
// Proporciona sugerencias a la consulta (por ejemplo, javax.persistence.query.timeout).

// @QueryHint
// Anotación individual usada dentro de @QueryHints.

// 3. Anotaciones de Parámetros de Consulta
// @Param
// Asocia un parámetro del método a un nombre en la consulta JPQL.

// @Value
// Inyecta valores estáticos o dinámicos (puede usarse con SpEL).

// @Temporal
// Define el tipo de temporalidad para fechas (en JPA).

// @Lock
// Define el tipo de bloqueo (optimista o pesimista) para una consulta.

// 4. Auditoría (Spring Data JPA y MongoDB)
// @CreatedDate
// Marca el campo que se rellenará con la fecha de creación.

// @LastModifiedDate
// Marca el campo que se actualizará con la última fecha de modificación.

// @CreatedBy
// Guarda el usuario que creó la entidad.

// @LastModifiedBy
// Guarda el usuario que modificó la entidad.

// @EnableJpaAuditing
// Activa la auditoría en Spring Data JPA.

// 5. Persistencia (JPA)
// Estas son de JPA, pero muy usadas en Spring Data:

// @Entity

// @Id

// @GeneratedValue

// @OneToOne, @OneToMany, @ManyToOne, @ManyToMany

// @JoinColumn

// @Column

// @Table

// 6. Otras útiles
// @EnableJpaRepositories
// Habilita el escaneo de interfaces de repositorios JPA.

// @EnableMongoRepositories
// Habilita el escaneo de repositorios MongoDB.

// @EnableCassandraRepositories, @EnableRedisRepositories, etc.
// Para otras bases de datos.

// 🧪 Extra: Anotaciones de Proyección y DTOs
// @Value("#{target.property}")
// SpEL para mapeo de interfaces basadas en proyecciones.

// @Projection
// Define interfaces DTO para consultas.

export * from './Connect';