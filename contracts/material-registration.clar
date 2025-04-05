;; Material Registration Contract
;; Records details of specialized teaching resources

(define-data-var last-material-id uint u0)

(define-map materials
  { material-id: uint }
  {
    title: (string-utf8 100),
    description: (string-utf8 500),
    subject: (string-utf8 50),
    grade-level: (string-utf8 20),
    owner: principal,
    created-at: uint,
    available: bool
  }
)

(define-public (register-material
    (title (string-utf8 100))
    (description (string-utf8 500))
    (subject (string-utf8 50))
    (grade-level (string-utf8 20)))
  (let
    (
      (new-id (+ (var-get last-material-id) u1))
    )
    (var-set last-material-id new-id)
    (map-set materials
      { material-id: new-id }
      {
        title: title,
        description: description,
        subject: subject,
        grade-level: grade-level,
        owner: tx-sender,
        created-at: block-height,
        available: true
      }
    )
    (ok new-id)
  )
)

(define-read-only (get-material (material-id uint))
  (map-get? materials { material-id: material-id })
)

(define-read-only (get-material-count)
  (var-get last-material-id)
)

(define-public (update-material-availability (material-id uint) (available bool))
  (let
    (
      (material (unwrap! (map-get? materials { material-id: material-id }) (err u1)))
    )
    (asserts! (is-eq tx-sender (get owner material)) (err u2))
    (map-set materials
      { material-id: material-id }
      (merge material { available: available })
    )
    (ok true)
  )
)
