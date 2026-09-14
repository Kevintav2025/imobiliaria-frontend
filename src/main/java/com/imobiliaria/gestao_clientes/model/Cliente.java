package com.imobiliaria.gestao_clientes.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tb_clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String telefone;

    private String email;

    private String tipoInteresse; // Ex: "Compra" ou "Aluguel"

    private String perfilImovel; // Ex: "Apto 2 quartos"

    private String statusAtendimento; // Ex: "Novo", "Em Negociação", "Fechado"

    @Column(columnDefinition = "TEXT")
    private String anotacoes;

    // Construtor Vazio (Obrigatório para o JPA)
    public Cliente() {}

    // Construtor Completo
    public Cliente(String nome, String telefone, String email, String tipoInteresse, String perfilImovel, String statusAtendimento, String anotacoes) {
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.tipoInteresse = tipoInteresse;
        this.perfilImovel = perfilImovel;
        this.statusAtendimento = statusAtendimento;
        this.anotacoes = anotacoes;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getTelefone() { return telefone; }
    public void setTelefone(String telefone) { this.telefone = telefone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getTipoInteresse() { return tipoInteresse; }
    public void setTipoInteresse(String tipoInteresse) { this.tipoInteresse = tipoInteresse; }

    public String getPerfilImovel() { return perfilImovel; }
    public void setPerfilImovel(String perfilImovel) { this.perfilImovel = perfilImovel; }

    public String getStatusAtendimento() { return statusAtendimento; }
    public void setStatusAtendimento(String statusAtendimento) { this.statusAtendimento = statusAtendimento; }

    public String getAnotacoes() { return anotacoes; }
    public void setAnotacoes(String anotacoes) { this.anotacoes = anotacoes; }
}